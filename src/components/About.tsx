"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const skills = [
  "Shopify",
  "Liquid",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Shopify CLI",
  "Shopify APIs",
  "Theme Development",
  "App Development",
  "GraphQL",
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-28 px-6 bg-[var(--surface)]">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-sm font-medium tracking-widest text-[var(--accent)] uppercase mb-3"
        >
          About
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl font-bold text-[var(--foreground)] mb-16"
        >
          自己紹介
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5"
          >
            <p className="text-[var(--foreground)] leading-relaxed">
              はじめまして。Shopifyを専門とするECサイト開発者です。
              マーチャントのビジネス課題を深く理解し、売上向上につながるストア設計・開発を行っています。
            </p>
            <p className="text-[var(--muted)] leading-relaxed">
              Shopify Liquidによるテーマカスタマイズから、Shopify APIを活用したアプリ開発まで幅広く対応。
              デザインから実装・運用保守まで一気通貫でサポートします。
            </p>
            <p className="text-[var(--muted)] leading-relaxed">
              国内外のShopifyマーチャントと協業し、多様な業種・規模のECサイト構築実績があります。
              お客様のビジネスゴールに合わせた最適なソリューションをご提案します。
            </p>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-sm font-semibold text-[var(--muted)] uppercase tracking-wider mb-5">
              Skills & Technologies
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.35, delay: 0.4 + i * 0.05 }}
                  className="px-3.5 py-1.5 rounded-full text-sm font-medium border border-[var(--border)] text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
