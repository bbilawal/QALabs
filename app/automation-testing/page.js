"use client";

import Link from "next/link";
import Image from "next/image";

export default function AutomationTesting() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">

      {/* ================= HEADER ================= */}
      <header className="flex justify-between items-center  px-8 py-1 border-b border-white/10 backdrop-blur sticky top-0 z-50 bg-black/40">
       <Image  
         src="/images/logo.png"
         alt="AutoQA Labs"
         width={0}
         height={0}
         sizes="100vw"
         className="w-40 md:w-52 lg:w-60 h-auto drop-shadow-[0_0_10px_rgba(236,72,153,0.6)]"
       />
        <div className="space-x-6 hidden md:block">
          <Link href="#">Features</Link>
          <Link href="#">Pricing</Link>
          <Link href="#">Docs</Link>
          <button className="bg-pink-500 px-5 py-2 rounded-lg font-semibold hover:bg-pink-600 transition">
            Get Demo
          </button>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="px-6 md:px-10 py-24 text-center max-w-5xl mx-auto">

        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Modern Test Automation Platform <br />
          <span className="text-pink-500">
            Built for CI/CD & AI Testing
          </span>
        </h1>

        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
          Manage, analyze, and scale your automation testing with Playwright,
          Cypress, Selenium, and more — all in one unified platform.
        </p>

        <div className="flex justify-center gap-4">
         <Link href="/qa-audit">
  <button className="bg-pink-500 px-8 py-3 rounded-lg">
    Get Free QA Audit
  </button>
</Link>
          <button className="border border-white/20 px-8 py-3 rounded-lg hover:bg-white/10 transition">
            View Demo
          </button>
        </div>

      </section>

      {/* ================= FEATURES ================= */}
      <section className="px-6 md:px-10 py-16 max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

        <FeatureBlock 
          title="Run & Track Tests"
          text="Execute tests across Playwright, Cypress, Selenium & more with full CI/CD integration."
        />

        <FeatureBlock
          title="Flaky Test Detection"
          text="AI-powered insights detect unstable tests and reduce false failures."
        />

        <FeatureBlock
          title="Automation ROI"
          text="Optimize performance, reduce execution time, and improve test reliability."
        />

        <FeatureBlock
          title="Smart Reporting"
          text="Generate beautiful reports with actionable insights for your team."
        />

      </section>

      {/* ================= IMAGE ================= */}
      <section className="px-6 md:px-10 py-20 max-w-6xl mx-auto">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 shadow-xl">
          <Image
            src="/images/cicd-dashboard.png"
            alt="Dashboard"
            width={1200}
            height={700}
            className="rounded-lg w-full"
          />
        </div>
      </section>

      {/* ================= FRAMEWORKS ================= */}
      <section className="px-6 md:px-10 py-20 bg-white/5">

        <h2 className="text-3xl font-bold text-center mb-12">
          Supported Frameworks
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">

          <Framework title="Playwright" />
          <Framework title="Cypress" />
          <Framework title="Selenium" />
          <Framework title="JUnit" />
          <Framework title="TestNG" />
          <Framework title="CodeceptJS" />

        </div>

      </section>

      {/* ================= ADVANCED ================= */}
      <section className="px-6 md:px-10 py-20 max-w-6xl mx-auto text-center">

        <h2 className="text-3xl font-bold mb-6">
          Built for Modern QA Teams
        </h2>

        <p className="text-gray-300 mb-12 max-w-2xl mx-auto">
          Supports JavaScript, Java, Python, .NET, Mobile, API and performance testing.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {["JavaScript", "Java", "Python", ".NET", "Mobile", "API"].map((tech) => (
            <div key={tech} className="bg-white/10 p-6 rounded-xl hover:scale-105 transition">
              <h3 className="text-pink-400 font-semibold">{tech}</h3>
            </div>
          ))}
        </div>

      </section>

      {/* ================= CI/CD ================= */}
      <section className="px-6 md:px-10 py-20 bg-white/5 text-center">

        <h2 className="text-3xl font-bold mb-10">
          CI/CD Integrations
        </h2>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {["Jenkins", "GitHub Actions", "GitLab CI", "Azure DevOps"].map((tool) => (
            <div key={tool} className="bg-white/10 p-5 rounded-xl">
              {tool}
            </div>
          ))}
        </div>

      </section>

      {/* ================= CTA ================= */}
      <section className="text-center py-24">

        <h2 className="text-4xl font-bold mb-4">
          Ready to Improve Your QA Process?
        </h2>

        <p className="text-gray-300 mb-6">
          Get started with a free audit and see how we can improve your testing.
        </p>

        <button className="bg-pink-500 hover:bg-pink-600 px-10 py-4 rounded-lg font-bold text-lg">
          Get Started
        </button>

      </section>

      {/* ================= FOOTER ================= */}
      <footer className="text-center py-10 text-gray-500 border-t border-white/10">
        © 2026 AutoQA Labs — AI Testing Simplified
      </footer>

    </div>
  );
}

/* ================= COMPONENTS ================= */

function FeatureBlock({ title, text }) {
  return (
    <div className="bg-white/10 p-6 rounded-xl hover:scale-105 transition shadow-lg">
      <h3 className="text-xl font-semibold text-pink-400 mb-2">
        {title}
      </h3>
      <p className="text-gray-300">{text}</p>
    </div>
  );
}

function Framework({ title }) {
  return (
    <div className="bg-white/10 p-5 rounded-xl hover:scale-105 transition text-center">
      <h3 className="text-pink-400 font-semibold mb-2">
        {title}
      </h3>
      <p className="text-gray-400 text-sm">
        Seamless integration with {title}
      </p>
    </div>
  );
}