"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Particles from "@tsparticles/react";
import { loadSlim } from "tsparticles-slim";
import { motion } from "framer-motion";

export default function QAWebsite() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="relative min-h-screen text-white overflow-hidden">

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800" />

      {/* Particle Background */}
      <Particles
        className="absolute inset-0 z-0"
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: "transparent" } },
          particles: {
            number: { value: 40 },
            color: { value: ["#ff0080", "#ff8c00", "#40e0d0"] },
            move: { enable: true, speed: 1 },
            opacity: { value: 0.5 },
            size: { value: { min: 2, max: 6 } }
          }
        }}
      />

      {/* Main Content Wrapper */}
      <div className="relative z-10">

        {/* Navbar */}
        <div className="flex justify-between items-center px-8 py-4 bg-white/10 backdrop-blur-lg border-b border-white/10">
          <h1 className="text-xl font-bold text-pink-300">AutoQA Labs</h1>
          <div className="flex gap-6">
            <Link href="#services"><Button variant="ghost">Services</Button></Link>
            <Link href="#pricing"><Button variant="ghost">Pricing</Button></Link>
            <Link href="#about"><Button variant="ghost">About</Button></Link>
            <Link href="#contact"><Button variant="ghost">Contact</Button></Link>
          </div>
        </div>

        {/* Hero */}
        <section className="text-center py-24 px-6">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-yellow-300 text-transparent bg-clip-text"
          >
            AI-Powered QA Automation Platform
          </motion.h1>

          <p className="text-gray-200 max-w-xl mx-auto">
            Reduce bugs, automate testing, and release faster with our SaaS QA solutions.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Button className="bg-pink-500 hover:bg-pink-600">Start Free Trial</Button>
            <Button variant="outline" className="border-white text-white">Book Demo</Button>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="grid md:grid-cols-3 gap-8 px-8 py-16">
          {["QA as a Service", "Automation Testing", "AI Test Solutions"].map((f, i) => (
            <Card key={i} className="bg-white/10 border border-white/10">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-pink-300">{f}</h3>
                <p className="text-gray-300">Deliver high-quality software faster with our expert solutions.</p>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-20 px-8 text-center">
          <h2 className="text-3xl font-bold mb-12 text-yellow-300">Pricing Plans</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {["Starter - $199/mo", "Growth - $499/mo", "Enterprise - $999/mo"].map((plan, i) => (
              <Card key={i} className="bg-white/10 border border-white/10">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-pink-300">{plan}</h3>
                  <Button className="mt-4 bg-purple-500">Choose Plan</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-20 px-8 text-center bg-white/10">
          <h2 className="text-3xl font-bold mb-6 text-pink-300">About Us</h2>
          <p className="max-w-2xl mx-auto text-gray-200">
            AutoQA Labs provides modern QA automation, AI testing, and scalable solutions to help teams release faster with confidence.
          </p>
        </section>

        {/* Contact */}
        <section id="contact" className="py-20 px-8 max-w-xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-yellow-300">Contact Us</h2>
          <div className="flex flex-col gap-4">
            <Input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <Textarea placeholder="Message" onChange={(e) => setForm({ ...form, message: e.target.value })} />
            <Button className="bg-pink-500">Send Message</Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-6 border-t border-white/10 text-gray-300">
          © 2026 AutoQA Labs
        </footer>

      </div>
    </div>
  );
}
