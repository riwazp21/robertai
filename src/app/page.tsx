"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Logging in...");

    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (res?.error) {
      setStatus(`❌ ${res.error}`);
    } else {
      setStatus("✅ Logged in!");
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf9f3] font-serif flex flex-col">
      {/* TopBar */}
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

      {/* Login Form */}
      <main className="flex flex-1 items-center justify-center px-6">
        <div className="w-full max-w-md bg-white border border-[#e0d5c0] rounded-xl shadow-xl p-8 space-y-6">
          {/* Heading */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#7b1e1e] mb-2">
              Welcome to RobertAI
            </h1>
            <p className="text-sm text-gray-600 leading-relaxed">
              Your personal strategist. Timeless wisdom meets modern AI insight.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border-2 border-[#d6c9b5] rounded-md px-4 py-2 text-sm bg-[#fdfdfc] focus:outline-none focus:ring-2 focus:ring-[#7b1e1e] transition"
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border-2 border-[#d6c9b5] rounded-md px-4 py-2 text-sm bg-[#fdfdfc] focus:outline-none focus:ring-2 focus:ring-[#7b1e1e] transition"
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#7b1e1e] to-[#9c1c1c] text-[#f1c40f] font-semibold py-2 rounded-md hover:text-white hover:shadow-lg transition duration-200"
            >
              Log In
            </button>

            {status && (
              <p className="text-center text-sm text-gray-700 mt-2">{status}</p>
            )}
          </form>

          <button
            onClick={() => router.push("/register")}
            className="w-full text-center text-sm text-[#7b1e1e] underline hover:text-[#9c1c1c] transition"
          >
            Don’t have an account? Sign up
          </button>
        </div>
      </main>
    </div>
  );
}
