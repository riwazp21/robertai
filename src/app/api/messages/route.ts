// /app/api/messages/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { decrypt } from "@/lib/encrypt";

export async function GET(req: NextRequest) {
  const chatId = req.nextUrl.searchParams.get("chatId");

  if (!chatId) {
    return NextResponse.json({ error: "chatId missing" }, { status: 400 });
  }

  const encryptedMessages = await prisma.message.findMany({
    where: { chatId },
    orderBy: { createdAt: "asc" },
  });

  const decryptedMessages = encryptedMessages.map((msg) => ({
    userMessage: decrypt(msg.userMessage),
    advisorMessage: decrypt(msg.advisorMessage),
    createdAt: msg.createdAt,
    id: msg.id,
  }));

  return NextResponse.json({ messages: decryptedMessages });
}
