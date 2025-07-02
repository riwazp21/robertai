"use client";

import { useRouter } from "next/navigation";

export default function TopBar() {
  const router = useRouter();

  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-gradient-to-r from-[#7b1e1e] to-[#9c1c1c]">
      <h1
        className="text-2xl font-bold text-[#f1c40f] cursor-pointer tracking-wide"
        onClick={() => router.push("/")}
      >
        RobertAI
      </h1>
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push("/about")}
          className="text-white hover:text-[#f1c40f] text-sm transition"
        >
          About
        </button>
        <button
          onClick={() => router.push("/sample")}
          className="bg-[#f1c40f] text-[#7b1e1e] font-medium text-sm px-4 py-2 rounded-md hover:bg-white hover:text-[#9c1c1c] transition"
        >
          Try Demo
        </button>
      </div>
    </nav>
  );
}
