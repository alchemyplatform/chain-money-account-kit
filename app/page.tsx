import { HomeWrapper } from "@/components/home-wrapper";
import { AppLayout } from "@/components/app-layout";
import { db } from "@/src/db";
import { transactionsTable, profilesTable } from "@/src/db/schema";
import { eq, desc } from "drizzle-orm";

async function getLatestTransactions() {
  try {
    // Fetch latest 5 transactions
    const transactions = await db
      .select({
        id: transactionsTable.id,
        transactionHash: transactionsTable.transactionHash,
        amount: transactionsTable.amount,
        message: transactionsTable.message,
        createdAt: transactionsTable.createdAt,
        fromUserId: transactionsTable.fromUserId,
        toUserId: transactionsTable.toUserId,
        senderDisplayName: profilesTable.displayName,
        senderUsername: profilesTable.username,
      })
      .from(transactionsTable)
      .leftJoin(
        profilesTable,
        eq(transactionsTable.fromUserId, profilesTable.userId)
      )
      .orderBy(desc(transactionsTable.createdAt))
      .limit(5);

    // Enrich with recipient info
    const enrichedTransactions = await Promise.all(
      transactions.map(async (transaction) => {
        const recipient = await db
          .select({
            displayName: profilesTable.displayName,
            username: profilesTable.username,
          })
          .from(profilesTable)
          .where(eq(profilesTable.userId, transaction.toUserId))
          .limit(1);

        return {
          id: transaction.id,
          transactionHash: transaction.transactionHash,
          amount: transaction.amount,
          message: transaction.message,
          createdAt: transaction.createdAt.toISOString(),
          senderDisplayName: transaction.senderDisplayName || "Unknown",
          senderUsername: transaction.senderUsername || "unknown",
          recipientDisplayName: recipient.length > 0 ? recipient[0].displayName : "Unknown",
          recipientUsername: recipient.length > 0 ? recipient[0].username : "unknown",
        };
      })
    );

    return enrichedTransactions;
  } catch (error) {
    console.error("Error fetching latest transactions:", error);
    return [];
  }
}

export default async function Home() {
  const latestTransactions = await getLatestTransactions();

  return (
    <AppLayout>
      <HomeWrapper latestTransactions={latestTransactions} />
    </AppLayout>
  );
}
