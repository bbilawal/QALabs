"use client";

import { useState } from "react";
import * as XLSX from "xlsx";
  import TextField from "@/components/TextField";
  import Header from "@/components/Header";

export default function QAServices() {
  const [criteria, setCriteria] = useState("");
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);

  const testTypes = [
    { label: "Functional", key: "functional" },
    { label: "Non-Functional", key: "nonfunctional" },
    { label: "Behavioral", key: "behavioral" },
    { label: "Specialized", key: "specialized" },
  ];

  const generateTests = async (type) => {
  if (!criteria.trim()) return;

  setLoading(true);

  try {
    const res = await fetch("/api/qa-services", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ criteria, type }),
    });

    // ✅ IMPORTANT FIX
    if (!res.ok) {
      const errorText = await res.text();
      console.error("API ERROR:", errorText);
      alert("API failed: " + errorText);
      return;
    }

    const data = await res.json();

    setResults((prev) => ({
      ...prev,
      [type]: data,
    }));

  } catch (err) {
    console.error("Frontend error:", err);
    alert("Error generating test cases");
  } finally {
    setLoading(false);
  }
};

  const generateAll = async () => {
    for (let t of testTypes) {
      await generateTests(t.key);
    }
  };

  const downloadExcel = (data, name) => {
    if (!Array.isArray(data)) return;

    const formatted = data.map((t) => ({
      Title: t.title,
      Steps: t.steps,
      Expected: t.expected,
    }));

    const ws = XLSX.utils.json_to_sheet(formatted);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Test Cases");

    XLSX.writeFile(wb, `${name}.xlsx`);
  };

  return (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-black text-white">

    {/* HEADER */}
    <Header />

    {/* PAGE CONTENT (IMPORTANT SPACING) */}
    <div className="flex-grow pt-20 px-6 md:px-10 max-w-6xl mx-auto">

      {/* TITLE */}
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Test Case Generator
      </h1>

      <p className="text-center text-gray-400 mb-10 max-w-2xl mx-auto">
        Generate structured, high-quality test cases instantly using AI.
        Supports functional, non-functional, and advanced QA scenarios.
      </p>

      {/* INPUT */}
      <div className="mb-8">
        <TextField
          rows={5}
          value={criteria}
          onChange={(e) => setCriteria(e.target.value)}
          placeholder="Enter acceptance criteria to generate test cases..."
        />
      </div>

      {/* BUTTON GROUP */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {testTypes.map((t) => (
          <button
            key={t.key}
            onClick={() => generateTests(t.key)}
            className="bg-pink-500 hover:bg-pink-600 transition p-4 rounded-xl shadow-lg font-semibold"
          >
            Generate {t.label} Test Cases
          </button>
        ))}

        <button
          onClick={generateAll}
          className="bg-indigo-500 hover:bg-indigo-600 p-4 rounded-xl col-span-2 font-bold"
        >
          🚀 Generate All Test Cases
        </button>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-yellow-400 mb-6 text-center animate-pulse">
          Generating... ⏳
        </p>
      )}

      {/* RESULTS */}
      {Object.entries(results).map(([key, value]) => (
        <div
          key={key}
          className="bg-white/10 backdrop-blur p-6 rounded-2xl mb-6 shadow-lg"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{key.toUpperCase()}</h2>

            <button
              onClick={() => downloadExcel(value, key)}
              className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              Download Excel
            </button>
          </div>

          <ul className="space-y-3">
            {Array.isArray(value) &&
              value.map((t, i) => (
                <li
                  key={i}
                  className="bg-black/40 p-4 rounded-xl border border-white/10"
                >
                  <strong className="text-pink-400">{t.title}</strong>
                  <p className="text-sm mt-1 text-gray-300">
                    Steps: {t.steps}
                  </p>
                  <p className="text-sm text-gray-400">
                    Expected: {t.expected}
                  </p>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>

    {/* FOOTER */}
    <footer className="text-center py-10 text-gray-400 border-t border-white/10 mt-10">
      © 2026 AutoQA Labs — AI Testing Simplified
    </footer>

  </div>
);
}