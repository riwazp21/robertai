// /app/api/chats/route.ts
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { decrypt } from "@/lib/encrypt"; // ✅ import decrypt
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = cookies();
    const userId = (await cookieStore).get("user_id")?.value;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const chats = await prisma.chat.findMany({
      where: { userId },
      select: { id: true, title: true },
      orderBy: { createdAt: "desc" },
    });

    // ✅ Decrypt each title before sending it to the client
    const decryptedChats = chats.map((chat) => ({
      id: chat.id,
      title: decrypt(chat.title),
    }));

    return NextResponse.json({ chats: decryptedChats });
  } catch (err) {
    console.error("Fetch chats error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
