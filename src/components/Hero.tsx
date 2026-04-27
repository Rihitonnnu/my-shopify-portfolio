"use client";

import { motion, type Variants, type Easing } from "framer-motion";

const EASE_OUT: Easing = "easeOut";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: EASE_OUT },
  }),
};

export default function Hero() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Accent blob */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--accent)] opacity-[0.06] blur-3xl pointer-events-none" />

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.p
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-sm font-medium tracking-widest text-[var(--accent)] uppercase mb-4"
        >
          Shopify Developer
        </motion.p>

        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-7xl font-bold text-[var(--foreground)] leading-tight mb-6"
        >
          Building Better
          <br />
          <span className="text-[var(--accent)]">Shopify Stores</span>
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-lg text-[var(--muted)] mb-10 leading-relaxed"
        >
          ECサイトの設計・開発・運用をトータルサポート。
          <br />
          ビジネスの成長を加速するShopifyソリューションを提供します。
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => scrollTo("#works")}
            className="px-8 py-3.5 rounded-full bg-[var(--accent)] text-white font-semibold text-sm hover:bg-[var(--accent-dark)] transition-colors shadow-md hover:shadow-lg cursor-pointer"
          >
            実績を見る
          </button>
          <button
            onClick={() => scrollTo("#contact")}
            className="px-8 py-3.5 rounded-full border border-[var(--border)] text-[var(--foreground)] font-semibold text-sm hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors cursor-pointer"
          >
            お問い合わせ
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-[var(--muted)] tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-[var(--muted)] to-transparent"
        />
      </motion.div>
    </section>
  );
}
