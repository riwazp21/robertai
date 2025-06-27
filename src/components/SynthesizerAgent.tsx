"use client";

import { useState } from "react";

interface LawFragment {
  number: string;
  title: string;
  judgment: string;
  summary: string;
}

interface SynthesizerAgentProps {
  userScenario: string;
  lawFragments: LawFragment[];
}

export default function SynthesizerAgent({
  userScenario,
  lawFragments,
}: SynthesizerAgentProps) {
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateAdvice = async () => {
    setLoading(true);
    try {
      const formattedFragments = lawFragments
        .map((law) =>
          `
Law ${law.number}: ${law.title}
Judgment: ${law.judgment}
Summary: ${law.summary}
        `.trim()
        )
        .join("\n\n");

      const res = await fetch("/api/synthesizer-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userScenario,
          lawFragments: formattedFragments,
        }),
      });

      const data = await res.json();
      setAdvice(data.advice || "");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <h2 className="text-xl font-bold">📖 Synthesizer Agent</h2>

      <button
        onClick={handleGenerateAdvice}
        className="px-4 py-2 bg-purple-600 text-white rounded"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Final Advice"}
      </button>

      <div>
        <h3 className="font-semibold mt-4">🗝️ Final Advice:</h3>
        <pre className="p-4 bg-yellow-50 rounded whitespace-pre-wrap">
          {advice || "No advice generated yet."}
        </pre>
      </div>
    </div>
  );
}
