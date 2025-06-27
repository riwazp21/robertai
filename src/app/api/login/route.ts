import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs"; // use bcryptjs!

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password required." },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.password) {
    return NextResponse.json(
      { error: "Invalid credentials." },
      { status: 400 }
    );
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return NextResponse.json(
      { error: "Invalid credentials." },
      { status: 400 }
    );
  }

  // ✅ Use NextResponse to set cookie properly:
  const res = NextResponse.json({
    message: "Logged in!",
    user: { id: user.id, email: user.email },
  });

  res.cookies.set("user_id", user.id, {
    httpOnly: true,
    path: "/",
  });

  return res;
}
