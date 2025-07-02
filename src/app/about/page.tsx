"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#fdf9f3] font-serif flex flex-col">
      {/* TopBar (matching LoginPage) */}
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

      {/* Main Content */}
      <main className="flex-1 px-6 py-12 flex justify-center">
        <div className="w-full max-w-4xl bg-white border border-[#e0d5c0] rounded-xl shadow-xl p-8 space-y-10">
          {/* Title */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#7b1e1e] mb-2">
              Behind the Strategy
            </h1>
            <p className="text-sm text-gray-600 leading-relaxed">
              Inspired by timeless strategy. Built with modern tools.
            </p>
          </div>

          {/* Book Section */}
          <section className="flex flex-col md:flex-row gap-6 items-center">
            <Image
              src="/database/image.jpeg"
              alt="48 Laws of Power"
              width={200}
              height={300}
              className="rounded shadow-md"
            />
            <div>
              <h2 className="text-xl font-semibold text-[#7b1e1e] mb-2">
                The Book
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm">
                The 48 Laws of Power by Robert Greene is a controversial yet
                powerful handbook on influence, strategy, and human behavior. It
                distills historical patterns into 48 clear laws used by rulers,
                rebels, and visionaries. The book is bold, unapologetic, and a
                must-read for anyone navigating complex systems of power.
              </p>
            </div>
          </section>

          {/* Why It’s Needed */}
          <section>
            <h2 className="text-xl font-semibold text-[#7b1e1e] mb-2">
              Why This App Exists
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              When I read books like <em>The 48 Laws of Power</em>, I often walk
              away carrying the vibe, the energy — but not the exact details. I
              remember how it made me feel, how it shaped my mindset, but
              applying its lessons later on becomes tricky. Flipping back
              through dense pages or searching for one law I vaguely recall?
              That’s where I felt the gap.
              <br />
              <br />
              Sure, AI tools like ChatGPT are great, but they often miss the
              deeper context unless you feed them a lot of specifics. I wanted
              something more focused — a companion built specifically around
              this book. A strategist that speaks its language fluently.
              <br />
              <br />
              {
                "So I summarized the entire book myself — line by line — with the help of trusted linguistic partners. This isn't just an AI bot pulling random facts. It's a curated experience, deeply rooted in the spirit of the book. The core message remains intact, and I’m learning from it in a way that’s active, dynamic, and respectful of the author’s original craft."
              }
            </p>
          </section>

          {/* What It Does */}
          <section>
            <h2 className="text-xl font-semibold text-[#7b1e1e] mb-2">
              What the App Does
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              RobertAI is an AI-powered companion built on top of the 48 laws.
              It lets you:
              <br />
              • Ask questions about any law
              <br />
              • Get examples, context, and ethical debates
              <br />
              • Practice applying laws to real-world scenarios
              <br />• Reflect on your own strategies and habits
            </p>
          </section>

          {/* About You */}
          <section>
            <h2 className="text-xl font-semibold text-[#7b1e1e] mb-2">
              About the Creator
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              My name is Riwaz — a software engineer, product designer, and tech
              consultant-in-training. I built this to blend philosophy,
              literature, and AI into one powerful experience. My goal is to
              help others learn the laws not just intellectually, but
              practically — to reflect, improve, and become tactically aware in
              their personal and professional lives.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
