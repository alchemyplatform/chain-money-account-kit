import { NextRequest, NextResponse } from "next/server";
import { getRpcUrl } from "@/lib/constants";

export async function POST(req: NextRequest) {
  const apiKey = process.env.ALCHEMY_API_KEY;
  if (!apiKey) {
    return new Response("ALCHEMY_API_KEY is not set", {
      status: 500,
    });
  }

  const body = await req.json();

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

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const rpcUrl = getRpcUrl(apiKey);

  const res = await fetch(rpcUrl, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  const responseData = await res.json();
  return NextResponse.json(responseData, { status: res.status });
}
