import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { encrypt } from "@/lib/encrypt";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  console.log("💥 session in /api/create-chat:", session);

  if (!session?.user?.id) {
    console.log("❌ session.user.id is missing — unauthorized");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title } = await req.json();
  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }
  const encryptedTitle = encrypt(title);

  try {
    const chat = await prisma.chat.create({
      data: {
        title: encryptedTitle,
        userId: session.user.id,
      },
    });

    return NextResponse.json({ chatId: chat.id });
  } catch (error) {
    console.error("Chat creation failed:", error);
    return NextResponse.json(
      { error: "Failed to create chat" },
      { status: 500 }
    );
  }
}
