import { useQuery } from "@tanstack/react-query";
import { formatUnits } from "viem";
import {
  USDC_CONTRACT_ADDRESS,
  AUSDC_CONTRACT_ADDRESS,
} from "@/lib/constants";
import { ERC20_ABI } from "@/lib/aave-abis";
import { useSmartAccount } from "@/contexts/smart-account-context";

export function useWalletBalance() {
  const { client, address } = useSmartAccount();

  return useQuery({
    queryKey: ["wallet", "balance", address],
    queryFn: async () => {
      if (!client || !address) {
        console.log("No client or address:", { client: !!client, address });
        return "0.00";
      }

      try {
        console.log("Fetching balance for address:", address);

        // Fetch USDC balance using client.readContract
        const usdcBalance = await client.readContract({
          address: USDC_CONTRACT_ADDRESS as `0x${string}`,
          abi: ERC20_ABI,
          functionName: "balanceOf",
          args: [address as `0x${string}`],
        });

        console.log("USDC balance (raw):", usdcBalance);

        // Fetch aUSDC balance using client.readContract
        const ausdcBalance = await client.readContract({
          address: AUSDC_CONTRACT_ADDRESS as `0x${string}`,
          abi: ERC20_ABI,
          functionName: "balanceOf",
          args: [address as `0x${string}`],
        });

        console.log("aUSDC balance (raw):", ausdcBalance);

        const liquid = parseFloat(formatUnits(usdcBalance as bigint, 6));
        const earning = parseFloat(formatUnits(ausdcBalance as bigint, 6));
        const total = liquid + earning;

        console.log("Balance breakdown:", { liquid, earning, total });

        return total.toFixed(2);
      } catch (error) {
        console.error("Error fetching balance:", error);
        return "0.00";
      }
    },
    enabled: !!client && !!address,
    staleTime: 2 * 1000, // 2 seconds - balance needs to be accurate
    gcTime: 10 * 1000, // Cache for 10 seconds
    refetchInterval: 5 * 1000, // Auto-refetch every 5 seconds
    refetchOnWindowFocus: true,
  });
}
