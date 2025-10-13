import { NextRequest, NextResponse } from "next/server";
import { db } from "@/src/db";
import { transactionsTable } from "@/src/db/schema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { transactionHash, fromUserId, toUserId, amount, message } = body;

    // Validate required fields
    if (!transactionHash || !fromUserId || !toUserId || !amount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Insert transaction into database
    const [transaction] = await db
      .insert(transactionsTable)
      .values({
        transactionHash,
        fromUserId,
        toUserId,
        amount: amount.toString(),
        message: message || null,
      })
      .returning();

    return NextResponse.json({ transaction }, { status: 201 });
  } catch (error) {
    console.error("Error creating transaction:", error);
    return NextResponse.json(
      { error: "Failed to create transaction" },
      { status: 500 }
    );
  }
}
