    "use client";

import AuditForm from "@/components/AuditForm";

export default function AuditPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">

      <div className="max-w-xl w-full bg-white/10 p-8 rounded-xl">

        <h1 className="text-3xl font-bold mb-4 text-center">
          Free QA Audit
        </h1>

        <p className="text-gray-300 mb-6 text-center">
          Submit your project details and get a free QA analysis.
        </p>

        <AuditForm />

      </div>

    </div>
  );
}