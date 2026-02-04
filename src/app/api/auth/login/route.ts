import { scalekit } from "@/lib/scalekit";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`;
    const url = scalekit.getAuthorizationUrl(redirectUrl);
    console.log("Redirecting to:", url);
    return NextResponse.redirect(url);
}