// /app/api/chats/route.ts
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { decrypt } from "@/lib/encrypt"; // ✅ import decrypt
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find user by email from session
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const chats = await prisma.chat.findMany({
      where: { userId: user.id },
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
