"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const countries = [
  { value: "", label: "Select your country" },
  { value: "US", label: "United States" },
  { value: "UK", label: "United Kingdom" },
  { value: "CA", label: "Canada" },
  { value: "NG", label: "Nigeria" },
  { value: "GH", label: "Ghana" },
  { value: "KE", label: "Kenya" },
  { value: "ZA", label: "South Africa" },
  { value: "OTHER", label: "Other" },
];

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !country) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, country }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setEmail("");
      setCountry("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <section className="bg-offwhite py-20 sm:py-28">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl font-bold text-charcoal sm:text-4xl">
            Be the First to Shop Kora
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-body text-lg text-charcoal/70">
            Join our waitlist for early access to curated drops, exclusive designer
            collaborations, and member-only pricing.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-3"
        >
          <input
            type="email"
            required
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading"}
            className="h-12 flex-1 rounded-full border border-charcoal/20 bg-white px-5 font-body text-base text-charcoal placeholder:text-charcoal/40 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20 disabled:opacity-50"
          />
          <select
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            disabled={status === "loading"}
            className="h-12 rounded-full border border-charcoal/20 bg-white px-5 font-body text-base text-charcoal focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20 disabled:opacity-50"
          >
            {countries.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
          <button
            type="submit"
            disabled={status === "loading"}
            className="h-12 rounded-full bg-forest px-8 font-body text-base font-semibold text-white transition-colors hover:bg-forest-dark disabled:opacity-50"
          >
            {status === "loading" ? "Joining..." : "Join the Waitlist"}
          </button>
        </motion.form>

        {status === "success" && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 font-body text-sm font-medium text-forest"
          >
            Welcome to the Kora community. We&apos;ll be in touch soon.
          </motion.p>
        )}

        {status === "error" && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 font-body text-sm font-medium text-red-600"
          >
            {errorMessage}
          </motion.p>
        )}
      </div>
    </section>
  );
}
