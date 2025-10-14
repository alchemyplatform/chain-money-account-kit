import { NextRequest, NextResponse } from "next/server";
import { db } from "@/src/db";
import { profilesTable } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    const { searchParams } = new URL(request.url);
    const smartAccountAddress = searchParams.get("smartAccountAddress");

    // Fetch the profile for the specific user
    const profile = await db
      .select({
        id: profilesTable.id,
        userId: profilesTable.userId,
        username: profilesTable.username,
        displayName: profilesTable.displayName,
        paymentAddress: profilesTable.paymentAddress,
        isEarningYield: profilesTable.isEarningYield,
      })
      .from(profilesTable)
      .where(eq(profilesTable.userId, userId))
      .limit(1);

    // If profile doesn't exist, create it
    if (profile.length === 0) {
      // Generate username from email (dannolan99@gmail.com -> dannolan99)
      const username = userId.split("@")[0];
      const displayName = username;

      const [newProfile] = await db
        .insert(profilesTable)
        .values({
          userId,
          username,
          displayName,
          paymentAddress: smartAccountAddress || null,
        })
        .returning();

      return NextResponse.json({ profile: newProfile }, { status: 200 });
    }

    // If profile exists and smartAccountAddress is provided, update the paymentAddress if it's changed
    if (smartAccountAddress && profile[0].paymentAddress !== smartAccountAddress) {
      const [updatedProfile] = await db
        .update(profilesTable)
        .set({ paymentAddress: smartAccountAddress })
        .where(eq(profilesTable.userId, userId))
        .returning();

      return NextResponse.json({ profile: updatedProfile }, { status: 200 });
    }

    return NextResponse.json({ profile: profile[0] }, { status: 200 });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    const body = await request.json();
    const { isEarningYield } = body;

    if (typeof isEarningYield !== "boolean") {
      return NextResponse.json(
        { error: "isEarningYield must be a boolean" },
        { status: 400 }
      );
    }

    // Update the profile
    const [updatedProfile] = await db
      .update(profilesTable)
      .set({ isEarningYield })
      .where(eq(profilesTable.userId, userId))
      .returning();

    if (!updatedProfile) {
      return NextResponse.json(
        { error: "Profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ profile: updatedProfile }, { status: 200 });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
