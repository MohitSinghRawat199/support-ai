import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/lib/db";
import settingsModel from "@/model/settings.model";
import { GoogleGenAI } from "@google/genai";

export const runtime = "nodejs";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function POST(req: NextRequest) {
  try {
    await connectDb();

    const { message, ownerId } = await req.json();

    if (!message || !ownerId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400, headers: corsHeaders }
      );
    }

    const setting = await settingsModel.findOne({ ownerId });

    if (!setting) {
      return NextResponse.json(
        { error: "Settings not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    const KNOWLEDGE = `
Business name: ${setting.businessName || "not provided"}
Support email: ${setting.supportEmail || "not provided"}
Knowledge: ${setting.knowledge || "not provided"}
`;

    const prompt = `
You are a professional customer support assistant.

Use ONLY the information below.
Do NOT invent anything.

--------------------
BUSINESS INFORMATION
--------------------
${KNOWLEDGE}

--------------------
CUSTOMER QUESTION
--------------------
${message}

--------------------
ANSWER
--------------------
`;

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });

    const res = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const reply =
      res.candidates?.[0]?.content?.parts
        ?.map((p: any) => p.text)
        .join("") || "No response generated";

    return NextResponse.json(
      { reply },
      { headers: corsHeaders }
    );

  } catch (error) {
    console.error("CHAT API ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}
