"use client";

import { useState, useEffect } from "react";
import Papa from "papaparse";

interface Law {
  number: string;
  title: string;
}

interface SelectorAgentPrototypeProps {
  onLawsSelected?: (laws: number[]) => void;
}

export default function SelectorAgentPrototype({
  onLawsSelected,
}: SelectorAgentPrototypeProps) {
  const [laws, setLaws] = useState<Law[]>([]);
  const [userInput, setUserInput] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [selectedLaws, setSelectedLaws] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ Load CSV from /public/database/48Laws.csv
  useEffect(() => {
    fetch("/database/48Laws.csv")
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          complete: (result) => {
            const parsed = result.data as any[];
            const extracted: Law[] = parsed.map((row) => ({
              number: row["LAW NUMBER"],
              title: row["LAW"],
            }));
            setLaws(extracted);
          },
        });
      })
      .catch((err) => {
        console.error("Failed to load CSV:", err);
      });
  }, []);

  // ✅ Build prompt & call secure API route
  const runSelectorAgent = async () => {
    const lawList = laws.map((law) => `${law.number}: ${law.title}`).join("\n");

    const prompt = `
You are the **Selector Agent**, an expert analyst trained on *The 48 Laws of Power* by Robert Greene.
Your sole mission is to receive any user situation and expertly analyze it to detect the minimal set of relevant Laws.
You must think strategically, with zero bias or verbosity.

**STRICT Instructions:**
- Thoroughly interpret the user’s message.
- Cross-check its themes against the complete list of 48 Laws (provided below).
- Select only the 1 to 3 Laws whose core principle precisely addresses the user’s situation.
- If only one Law fully covers the scenario, do not force extra Laws — brevity is power.
- **Respond in VALID JSON only.**
- Do **NOT** add any text, greetings, comments, or extra lines — output **ONLY** the raw JSON object on the first line.

✅ **JSON Response Format:**
{
  "selected_laws": [1, 15, 27]
}

Replace the numbers with the actual selected Law numbers.
Do **NOT** include any explanation, commentary, or extra text — only output valid JSON.

---

**Available Laws:**
${lawList}

---

**User Situation:**
"${userInput}"
    `.trim();

    setGeneratedPrompt(prompt);
    setLoading(true);

    try {
      const res = await fetch("/api/selector-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      const newSelectedLaws = data.selected_laws || [];

      setSelectedLaws(newSelectedLaws);

      // ✅ Also call the parent callback if provided:
      if (onLawsSelected) {
        onLawsSelected(newSelectedLaws);
      }
    } catch (err) {
      console.error("Client call error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <h2 className="text-xl font-bold">
        🧠 Selector Agent Prototype (Server-secure)
      </h2>

      <textarea
        placeholder="Enter the user situation..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        className="w-full p-2 border rounded"
        rows={4}
      />

      <button
        onClick={runSelectorAgent}
        className="px-4 py-2 bg-blue-600 text-white rounded"
        disabled={loading}
      >
        {loading ? "Running..." : "Run Selector Agent"}
      </button>

      <div>
        <h3 className="font-semibold mt-4">✅ Generated Prompt:</h3>
        <pre className="p-4 bg-gray-100 rounded whitespace-pre-wrap">
          {generatedPrompt}
        </pre>
      </div>

      <div>
        <h3 className="font-semibold mt-4">✅ Selected Laws:</h3>
        <pre className="p-4 bg-green-100 rounded">
          {selectedLaws.length > 0
            ? JSON.stringify(selectedLaws)
            : "No laws selected yet."}
        </pre>
      </div>
    </div>
  );
}
