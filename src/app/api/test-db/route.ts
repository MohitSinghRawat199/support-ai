import connectDb from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
 console.log("MongoDbURI:", process.env.MongoDbURI);

}
