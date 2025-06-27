"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("");

  const isPasswordStrong = (pw: string) =>
    pw.length >= 8 &&
    /[A-Z]/.test(pw) &&
    /[a-z]/.test(pw) &&
    /\d/.test(pw) &&
    /[!@#$%^&*]/.test(pw);

  const handleRegister = async () => {
    setStatus("");

    if (password !== confirmPassword) {
      setStatus("❌ Passwords do not match");
      return;
    }

    if (!isPasswordStrong(password)) {
      setStatus(
        "❌ Password must be at least 8 characters, include uppercase, lowercase, number, and special character"
      );
      return;
    }

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      setStatus("✅ Registered successfully! Redirecting...");
      setTimeout(() => router.push("/"), 1500);
    } else {
      setStatus(`❌ ${data.error}`);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#fdf9f3] p-6 font-serif">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-[#e0d5c0]">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#7b1e1e]">
          Create Your Account
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border border-[#dacbb3] p-3 mb-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7b1e1e] transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border border-[#dacbb3] p-3 mb-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7b1e1e] transition"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full border border-[#dacbb3] p-3 mb-6 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7b1e1e] transition"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button
          onClick={handleRegister}
          className="w-full bg-gradient-to-br from-[#7b1e1e] to-[#9c1c1c] text-white py-3 rounded-xl font-semibold shadow-md transition transform hover:scale-105 hover:shadow-lg cursor-pointer"
        >
          Register
        </button>

        {status && (
          <p
            className={`text-sm mt-4 text-center ${
              status.startsWith("✅")
                ? "text-green-600"
                : status.startsWith("❌")
                ? "text-red-600"
                : ""
            }`}
          >
            {status}
          </p>
        )}

        <button
          onClick={() => router.push("/")}
          className="w-full mt-4 text-sm text-[#7b1e1e] underline hover:text-[#9c1c1c] transition cursor-pointer"
        >
          Already have an account? Log in
        </button>
      </div>

      {/* Why Section */}
      <section className="mt-12 max-w-xl text-center text-gray-700">
        <h3 className="text-xl font-semibold mb-2">Why RobertAI?</h3>
        <p className="text-sm leading-relaxed px-4">
          RobertAI is your personal strategist — analyzing your real-world
          situations, finding power principles that fit, and guiding you with
          psychological clarity and timeless tactics.
        </p>
      </section>
    </main>
  );
}
