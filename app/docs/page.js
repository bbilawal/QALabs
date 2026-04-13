"use client";

import DocsSidebar from "@/components/DocsSidebar";

export default function DocsPage() {
  return (
    <div className="flex min-h-screen bg-black text-white">

      {/* Sidebar */}
      <DocsSidebar />

      {/* Content */}
      <div className="flex-1 p-10 max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold mb-6">
          Automation Testing Docs
        </h1>

        <p className="text-gray-300 mb-6">
          Learn how to integrate and scale your automation testing workflows.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-3">
          Getting Started
        </h2>

        <p className="text-gray-400">
          Install CLI and connect your test frameworks.
        </p>

        <pre className="bg-white/10 p-4 rounded-lg mt-4 text-sm">
          npm install autoqa-cli
        </pre>

        <h2 className="text-2xl font-semibold mt-10 mb-3">
          Run Tests
        </h2>

        <pre className="bg-white/10 p-4 rounded-lg text-sm">
          autoqa run playwright
        </pre>

      </div>
    </div>
  );
}