import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // ✅ Secure, not exposed
});

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are the Selector Agent for The 48 Laws of Power.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const content = completion.choices[0].message.content;
    console.log(content);
    if (!content) {
      return NextResponse.json(
        { error: "OpenAI did not return any content." },
        { status: 500 }
      );
    }

    // ✅ Robust: extract JSON object only
    const match = content.match(/\{[\s\S]*\}/);
    if (!match) {
      return NextResponse.json(
        { error: "OpenAI response does not contain valid JSON." },
        { status: 500 }
      );
    }

    const parsed = JSON.parse(match[0]);
    return NextResponse.json({ selected_laws: parsed.selected_laws });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("API Route error:", err.message);
    } else {
      console.error("Unknown error:", err);
    }
    return NextResponse.json(
      { error: "Failed to process Selector Agent request." },
      { status: 500 }
    );
  }
}
