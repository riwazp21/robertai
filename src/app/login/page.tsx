"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react"; // ✅ This is the magic!

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const handleLogin = async () => {
    setStatus("Logging in...");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    console.log("🔍 Login result:", res);

    if (res?.error) {
      setStatus(`❌ ${res.error}`);
    } else {
      setStatus("✅ Logged in successfully!");
      router.push("/dashboard");
    }
  };

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Login</h1>

      <input
        type="email"
        placeholder="Email"
        className="w-full border p-2 mb-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full border p-2 mb-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="w-full bg-green-600 text-white py-2 rounded"
      >
        Login
      </button>

      {status && <p className="mt-4">{status}</p>}
    </main>
  );
}
