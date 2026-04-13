"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Bot, Cpu, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";



export default function Home() {
  const router = useRouter();


    const services = [
  {
    name: "QA Service",
    icon: <ShieldCheck size={40} />,
    desc: "Generate structured test cases",
    action: () => router.push("/qa-services"),
  },
  {
    name: "Automation Testing",
    icon: <Cpu size={40} />,
    desc: "End-to-end QA services for startups & enterprises",
    action: () => router.push("/automation-testing"),
  },
  {
    name: "AI Testing",
    icon: <Bot size={40} />,
    desc: "Run AI-powered website crawling and defect detection",
    action: () => router.push("/ai-testing"),
  },
];

  return (
    <div className="min-h-screen text-white bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">

    {/* Navbar */}
 <Header />
  
     

      {/* Hero */}
      <div className="text-center py-24">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold mb-6"
        >
          AI-Powered QA Automation Platform
        </motion.h1>

        <p className="text-gray-300">
          Reduce bugs, automate testing, and release faster
        </p>
      </div>

      {/* Services */}
      <section id="services" className="scroll-mt-32 grid md:grid-cols-3 gap-8 px-8 py-16">
        {services.map((s, i) => (
  <motion.div
    key={i}
    whileHover={{ scale: 1.05 }}
    onClick={s.action} // ✅ whole card clickable
    className="bg-white/10 p-6 rounded-2xl shadow-lg backdrop-blur-lg 
               transition duration-300 hover:shadow-2xl cursor-pointer"
  >
    <div className="mb-4 text-pink-300">{s.icon}</div>

    <h3 className="text-xl font-bold mb-2">{s.name}</h3>
    <p className="text-gray-300">{s.desc}</p>
  </motion.div>
))}
      </section>

           {/* About */}
      <section id="about" className="scroll-mt-32 text-center py-20 bg-white/10">
        <h2 className="text-3xl mb-4">About Us</h2>
        <p className="max-w-xl mx-auto">
         From AI-driven test case generation to robust automation frameworks and CI/CD integration, we help teams streamline testing workflows, reduce defects, and deliver high-quality software faster
        </p>
      </section>

     {/* Contact Us */}
<section id="qa-audit" className="scroll-mt-32 text-center py-20 px-6">
  <h2 className="text-4xl font-bold mb-4">
    Contact
  </h2>

  <p className="text-gray-300 mb-10 max-w-xl mx-auto">
    Get a detailed QA report with bug analysis, performance insights,
    and automation recommendations.
  </p>

  <form
    onSubmit={async (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);

      await fetch("/api/audit", {
        method: "POST",
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          project: formData.get("project"),
        }),
      });

      alert("✅ Audit request submitted!");
    }}
    className="max-w-xl mx-auto space-y-4"
  >
    <input
      name="name"
      placeholder="Your Name"
      required
      className="w-full p-3 rounded text-black"
    />

    <input
      name="email"
      placeholder="Email"
      required
      className="w-full p-3 rounded text-black"
    />

    <textarea
      name="project"
      placeholder="Project details..."
      required
      className="w-full p-3 rounded text-black"
    />

    <button className="bg-pink-500 px-6 py-3 rounded font-bold w-full">
      Submit Audit
    </button>
  </form>
</section>

      {/* Footer */}
      <div className="text-center py-10 text-gray-400">
        © 2026 AutoQA Labs — AI Testing Simplified
      </div>
    </div>
  );
}