"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Discover",
    description:
      "Browse curated collections from Africa's most sought-after designers — each piece vetted for quality, story, and style.",
  },
  {
    number: "02",
    title: "Order",
    description:
      "Secure checkout with support for multiple currencies. Pay in USD, GBP, CAD, or NGN — whichever feels like home.",
  },
  {
    number: "03",
    title: "Delivered",
    description:
      "Worldwide fulfillment from our distribution hubs. Tracked shipping, premium packaging, and the confidence that your order is handled with care.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function HowItWorks() {
  return (
    <section className="bg-forest py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            How It Works
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-lg text-white/70">
            From discovery to doorstep — your journey with Kora is seamless.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 grid gap-10 sm:grid-cols-3"
        >
          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={itemVariants}
              className="text-center"
            >
              <span className="font-heading text-5xl font-bold text-gold">
                {step.number}
              </span>
              <h3 className="mt-4 font-heading text-2xl font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-3 font-body text-base leading-relaxed text-white/70">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
