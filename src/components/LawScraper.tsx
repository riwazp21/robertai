"use client";

import { useState, useEffect } from "react";
import Papa from "papaparse";

interface LawRow {
  number: string;
  title: string;
  judgment: string;
  summary: string;
}

interface LawScraperProps {
  selectedLaws: number[]; // e.g. [1, 15, 27]
  onScraped?: (fragments: LawRow[]) => void; // ✅ NEW PROP
}

export default function LawScraper({
  selectedLaws,
  onScraped,
}: LawScraperProps) {
  const [lawDetails, setLawDetails] = useState<LawRow[]>([]);

  useEffect(() => {
    if (selectedLaws.length === 0) {
      setLawDetails([]);
      return;
    }

    // ✅ Fetch CSV & filter matching laws
    fetch("/database/48Laws.csv")
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          complete: (result) => {
            const parsed = result.data as any[];
            const matching = parsed
              .filter((row) =>
                selectedLaws.includes(parseInt(row["LAW NUMBER"], 10))
              )
              .map((row) => ({
                number: row["LAW NUMBER"],
                title: row["LAW"],
                judgment: row["JUDGEMENT"],
                summary: row["SUMMARY"],
              }));

            setLawDetails(matching);

            // ✅ ALSO CALL THE CALLBACK, if provided
            if (onScraped) {
              onScraped(matching);
            }
          },
        });
      })
      .catch((err) => {
        console.error("Error loading CSV:", err);
      });
  }, [selectedLaws, onScraped]);

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <h2 className="text-xl font-bold">📚 Law Details</h2>

      {lawDetails.length === 0 ? (
        <p>No laws to display. Run Selector Agent first.</p>
      ) : (
        <div className="space-y-6">
          {lawDetails.map((law) => (
            <div key={law.number} className="p-4 bg-gray-100 rounded shadow">
              <h3 className="text-lg font-bold">
                Law {law.number}: {law.title}
              </h3>
              <p className="mt-2">
                <strong>Judgment:</strong> {law.judgment}
              </p>
              <p className="mt-2">
                <strong>Summary:</strong> {law.summary}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
