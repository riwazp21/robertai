// /app/api/save-message/route.ts
import { prisma } from "@/lib/prisma";
import { encrypt } from "@/lib/encrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { chatId, userMessage, advisorMessage } = await req.json();

    if (!chatId || !userMessage || !advisorMessage) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await prisma.message.create({
      data: {
        chatId,
        userMessage: encrypt(userMessage),
        advisorMessage: encrypt(advisorMessage),
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Save Message Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
