import { useQuery } from "@tanstack/react-query";
import { encodeFunctionData, decodeFunctionResult } from "viem";
import {
  USDC_CONTRACT_ADDRESS,
  AAVE_V3_POOL_ADDRESS,
} from "@/lib/constants";
import { AAVE_POOL_ABI } from "@/lib/aave-abis";

async function fetchApy(): Promise<string> {
  try {
    const calldata = encodeFunctionData({
      abi: AAVE_POOL_ABI,
      functionName: "getReserveData",
      args: [USDC_CONTRACT_ADDRESS as `0x${string}`],
    });

    const response = await fetch("/api/rpc", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_call",
        params: [{ to: AAVE_V3_POOL_ADDRESS, data: calldata }, "latest"],
        id: 1,
      }),
    });

    const data = await response.json();

    if (data.result) {
      const decoded = decodeFunctionResult({
        abi: AAVE_POOL_ABI,
        functionName: "getReserveData",
        data: data.result as `0x${string}`,
      }) as { currentLiquidityRate: bigint };

      const liquidityRate = decoded.currentLiquidityRate;

      if (liquidityRate) {
        // AAVE rates are in RAY units (10^27), convert to APY percentage
        const RAY = BigInt(10) ** BigInt(27);
        const apyDecimal = Number((BigInt(liquidityRate) * BigInt(10000)) / RAY) / 100;
        return apyDecimal.toFixed(2);
      }
    }

    return "3.5"; // Fallback
  } catch (error) {
    console.error("Error fetching APY:", error);
    return "3.5"; // Fallback
  }
}

export function useAaveApy() {
  return useQuery({
    queryKey: ["aave", "apy", "usdc"],
    queryFn: fetchApy,
    staleTime: 5 * 60 * 1000, // 5 minutes - APY doesn't change often
    gcTime: 10 * 60 * 1000, // Cache for 10 minutes
    refetchOnWindowFocus: false,
  });
}
