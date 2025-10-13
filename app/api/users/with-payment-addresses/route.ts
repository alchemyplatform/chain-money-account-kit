import { NextResponse } from "next/server";
import { db } from "@/src/db";
import { profilesTable } from "@/src/db/schema";
import { isNotNull } from "drizzle-orm";

export async function GET() {
  try {
    // Fetch all profiles that have a payment address set
    const profiles = await db
      .select({
        id: profilesTable.id,
        userId: profilesTable.userId,
        username: profilesTable.username,
        displayName: profilesTable.displayName,
        paymentAddress: profilesTable.paymentAddress,
        isEarningYield: profilesTable.isEarningYield,
      })
      .from(profilesTable)
      .where(isNotNull(profilesTable.paymentAddress));

    return NextResponse.json({ users: profiles }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users with payment addresses:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
