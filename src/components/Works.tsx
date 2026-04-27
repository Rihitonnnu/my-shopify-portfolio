"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const works = [
  {
    title: "アパレルブランド ECサイト",
    description:
      "国内アパレルブランドのShopifyストアをゼロから構築。カスタムテーマ開発と在庫管理システム連携を実装。",
    tags: ["Shopify", "Liquid", "カスタムテーマ", "API連携"],
    color: "#96bf48",
  },
  {
    title: "食品・健康食品 EC",
    description:
      "定期購入（サブスクリプション）機能を中心とした健康食品ECサイト。LTVの最大化を意識した設計。",
    tags: ["Shopify", "Subscription", "JavaScript", "UI/UX"],
    color: "#5c6ac4",
  },
  {
    title: "インテリア・雑貨 ストア",
    description:
      "高品質な商品写真を活かしたビジュアル重視のストア設計。モバイルファーストで直帰率を大幅改善。",
    tags: ["Shopify", "Liquid", "Tailwind CSS", "パフォーマンス最適化"],
    color: "#f59e0b",
  },
  {
    title: "コスメ・美容品 ブランド",
    description:
      "ブランドイメージを忠実に再現したカスタムテーマ。SNSマーケティングとの連携強化でCV率向上。",
    tags: ["Shopify", "カスタムテーマ", "SNS連携", "Analytics"],
    color: "#ec4899",
  },
  {
    title: "BtoB向け卸売りストア",
    description:
      "法人顧客向けの卸売り機能（価格設定・ボリューム割引・承認フロー）をShopifyで実現。",
    tags: ["Shopify Plus", "B2B", "GraphQL", "カスタムApp"],
    color: "#14b8a6",
  },
  {
    title: "越境EC（多言語・多通貨）",
    description:
      "日本・海外同時展開の越境ECサイト。Shopify Marketsを活用した多言語・多通貨・税制対応を実装。",
    tags: ["Shopify Markets", "多言語", "多通貨", "国際対応"],
    color: "#8b5cf6",
  },
];

export default function Works() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="works" className="py-28 px-6 bg-white">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-sm font-medium tracking-widest text-[var(--accent)] uppercase mb-3"
        >
          Works
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl font-bold text-[var(--foreground)] mb-4"
        >
          Shopify 構築実績
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-[var(--muted)] mb-16"
        >
          これまでに手がけたShopifyストア構築の一部をご紹介します。
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {works.map((work, i) => (
            <motion.article
              key={work.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group bg-[var(--surface)] rounded-2xl p-6 border border-[var(--border)] hover:border-transparent hover:shadow-xl hover:shadow-black/5 transition-all duration-300 cursor-default"
            >
              {/* Color accent bar */}
              <div
                className="w-10 h-1 rounded-full mb-5 opacity-80"
                style={{ backgroundColor: work.color }}
              />

              <h3 className="font-bold text-[var(--foreground)] text-lg mb-3 leading-snug">
                {work.title}
              </h3>
              <p className="text-[var(--muted)] text-sm leading-relaxed mb-5">
                {work.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {work.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{
                      backgroundColor: `${work.color}18`,
                      color: work.color,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
