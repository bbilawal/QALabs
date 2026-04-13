"use client";

import { useState } from "react";

export default function AuditForm() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    project: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/audit", {
      method: "POST",
      body: JSON.stringify(form),
    });

    const data = await res.json();

    setMessage(data.message);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <input
        placeholder="Your Name"
        className="w-full p-3 rounded bg-black border border-gray-700"
        onChange={(e) => setForm({...form, name: e.target.value})}
      />

      <input
        placeholder="Email"
        className="w-full p-3 rounded bg-black border border-gray-700"
        onChange={(e) => setForm({...form, email: e.target.value})}
      />

      <textarea
        placeholder="Project Details"
        className="w-full p-3 rounded bg-black border border-gray-700"
        onChange={(e) => setForm({...form, project: e.target.value})}
      />

      <button
        type="submit"
        className="w-full bg-pink-500 py-3 rounded font-bold"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>

      {message && (
        <p className="text-green-400 text-center">{message}</p>
      )}

    </form>
  );
}