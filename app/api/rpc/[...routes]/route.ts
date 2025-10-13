import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ routes: string[] }> }
) {
  const apiKey = process.env.ALCHEMY_API_KEY;
  if (!apiKey) {
    return new Response("ALCHEMY_API_KEY is not set", {
      status: 500,
    });
  }

  const { routes } = await params;
  const body = await req.json();

  // Only pass through specific headers that Alchemy needs
  // Don't forward browser headers like host, origin, referer, etc.
  const headers: Record<string, string> = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };

  // Optionally forward the Alchemy SDK version if present
  const alchemySdkVersion = req.headers.get("alchemy-aa-sdk-version");
  if (alchemySdkVersion) {
    headers["alchemy-aa-sdk-version"] = alchemySdkVersion;
  }

  const policyId = process.env.ALCHEMY_POLICY_ID;
  if (!policyId) {
    return new Response("ALCHEMY_POLICY_ID is not set", {
      status: 500,
    });
  }

  // Inject policy ID for gas sponsorship requests
  if (body.method === "alchemy_requestGasAndPaymasterAndData") {
    body.params[0].policyId = policyId;
  }

  // Inject policy ID for wallet_prepareCalls and wallet_sendCalls
  if (body.method === "wallet_prepareCalls" || body.method === "wallet_sendCalls") {
    if (body.params?.[0]?.capabilities?.paymasterService?.policyIds) {
      body.params[0].capabilities.paymasterService.policyIds = [policyId];
    }
  }

  // Construct Alchemy API URL from routes
  const alchemyApiUrl = `https://api.g.alchemy.com/${routes.join("/")}`;

  const res = await fetch(alchemyApiUrl, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  const responseData = await res.json();
  return NextResponse.json(responseData, { status: res.status });
}
