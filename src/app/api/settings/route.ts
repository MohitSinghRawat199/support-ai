import connectDb from "@/lib/db";
import Settings from "@/model/settings.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { ownerId, businessName, supportEmail, knowledge } = body;

    if (!ownerId || !businessName || !supportEmail || !knowledge) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    await connectDb();

    const settings = await Settings.findOneAndUpdate(
      { ownerId },
      { businessName, supportEmail, knowledge },
      { new: true, upsert: true }
    );

    return NextResponse.json(settings, { status: 200 });
  } catch (error) {
    console.error("❌ SETTINGS API ERROR:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
