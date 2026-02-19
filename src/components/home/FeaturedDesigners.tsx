"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const designers = [
  {
    name: "Adùnní Studio",
    country: "Nigeria",
    tagline: "Where Yorùbá textile traditions meet contemporary silhouettes.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80",
  },
  {
    name: "Malaika Collective",
    country: "Kenya",
    tagline: "East African bold prints reimagined for the modern professional.",
    image:
      "https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=600&q=80",
  },
  {
    name: "Nkrumah Atelier",
    country: "Ghana",
    tagline: "Kente-inspired luxury with an unapologetically global edge.",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80",
  },
  {
    name: "Sahel & Co.",
    country: "Senegal",
    tagline: "Minimalist elegance drawn from the colors of the Sahel.",
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function FeaturedDesigners() {
  return (
    <section id="featured-designers" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl font-bold text-charcoal sm:text-4xl">
            Featured Designers
          </h2>
          <p className="mt-4 max-w-xl font-body text-lg text-charcoal/70">
            Meet the visionaries shaping the future of African fashion on the
            world stage.
          </p>
        </motion.div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="scrollbar-hide mt-12 flex gap-6 overflow-x-auto px-6 pb-4 sm:mx-auto sm:max-w-6xl"
      >
        {designers.map((designer) => (
          <motion.div
            key={designer.name}
            variants={cardVariants}
            className="group flex-shrink-0 w-72 sm:w-80"
          >
            <div className="relative h-96 w-full overflow-hidden rounded-2xl">
              <Image
                src={designer.image}
                alt={designer.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 288px, 320px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-body text-sm font-medium uppercase tracking-widest text-gold">
                  {designer.country}
                </p>
                <h3 className="mt-1 font-heading text-2xl font-bold text-white">
                  {designer.name}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-white/80">
                  {designer.tagline}
                </p>
                <a
                  href="#"
                  className="mt-4 inline-block font-body text-sm font-semibold text-gold transition-colors hover:text-gold-light"
                >
                  View Collection →
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
