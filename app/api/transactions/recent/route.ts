import { NextResponse } from "next/server";
import { db } from "@/src/db";
import { transactionsTable, profilesTable } from "@/src/db/schema";
import { eq, or, desc } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    // TODO: Add Account Kit authentication check here
    // For now, get userId from query params
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID required" },
        { status: 400 }
      );
    }

    // Fetch recent transactions where user is either sender or receiver
    const transactions = await db
      .select({
        id: transactionsTable.id,
        transactionHash: transactionsTable.transactionHash,
        fromUserId: transactionsTable.fromUserId,
        toUserId: transactionsTable.toUserId,
        amount: transactionsTable.amount,
        message: transactionsTable.message,
        createdAt: transactionsTable.createdAt,
        // Sender profile info
        senderDisplayName: profilesTable.displayName,
        senderUsername: profilesTable.username,
      })
      .from(transactionsTable)
      .leftJoin(
        profilesTable,
        eq(transactionsTable.fromUserId, profilesTable.userId)
      )
      .where(
        or(
          eq(transactionsTable.fromUserId, userId),
          eq(transactionsTable.toUserId, userId)
        )
      )
      .orderBy(desc(transactionsTable.createdAt))
      .limit(10);

    // For each transaction, we need to get the recipient info separately
    // if the current user is the sender, or keep sender info if current user is recipient
    const enrichedTransactions = await Promise.all(
      transactions.map(async (transaction) => {
        let recipientDisplayName = "";
        let recipientUsername = "";

        // If current user is sender, get recipient info
        if (transaction.fromUserId === userId) {
          const recipient = await db
            .select({
              displayName: profilesTable.displayName,
              username: profilesTable.username,
            })
            .from(profilesTable)
            .where(eq(profilesTable.userId, transaction.toUserId))
            .limit(1);

          if (recipient.length > 0) {
            recipientDisplayName = recipient[0].displayName;
            recipientUsername = recipient[0].username;
          }
        }

        return {
          id: transaction.id,
          transactionHash: transaction.transactionHash,
          amount: transaction.amount,
          message: transaction.message,
          createdAt: transaction.createdAt,
          isSent: transaction.fromUserId === userId,
          senderDisplayName: transaction.senderDisplayName,
          senderUsername: transaction.senderUsername,
          recipientDisplayName,
          recipientUsername,
        };
      })
    );

    return NextResponse.json({ transactions: enrichedTransactions }, { status: 200 });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}