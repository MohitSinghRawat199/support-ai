import connectDb from "@/lib/db";
import Settings from "@/model/settings.model";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { ownerId } = body;

    if (!ownerId) {
      return new Response(
        JSON.stringify({ message: "Owner ID is required" }),
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectDb();

    // Find settings for this owner
    const settings = await Settings.findOne({ ownerId });

    if (!settings) {
      return new Response(
        JSON.stringify({ message: "Settings not found" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(settings), { status: 200 });
  } catch (err: any) {
    console.error("Error in get settings route:", err.message);
    return new Response(
      JSON.stringify({ message: "Internal Server Error", error: err.message }),
      { status: 500 }
    );
  }
}
