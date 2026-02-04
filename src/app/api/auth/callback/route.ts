import { scalekit } from "@/lib/scalekit";
import { NextRequest, NextResponse } from "next/server"

export async function GET(req:NextRequest){  
  const {searchParams} = new URL(req.url); 
  const code = searchParams.get("code");
  if(!code){    
    return NextResponse.json({message:"Authorization code is missing"}, {status:400});
  }
  const session = await scalekit.authenticateWithCode(code, `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`);
  console.log(session);
  const response= NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/`);
  response.cookies.set("access_token",session.accessToken,{
    httpOnly: true,
    secure: true,
    maxAge: 24*60*60*1000,
    path:"/"
  });
  return response;
}