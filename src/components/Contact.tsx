"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [status, setStatus] = useState<Status>("idle");

  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formspreeId) {
      // Formspree未設定時はmailtoにフォールバック
      const form = e.currentTarget;
      const name = (form.elements.namedItem("name") as HTMLInputElement).value;
      const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;
      window.location.href = `mailto:hexiliang04@gmail.com?subject=${encodeURIComponent(`ポートフォリオからのお問い合わせ - ${name}`)}&body=${encodeURIComponent(message)}`;
      return;
    }

    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-28 px-6 bg-[var(--surface)]">
      <div className="max-w-2xl mx-auto" ref={ref}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-sm font-medium tracking-widest text-[var(--accent)] uppercase mb-3"
        >
          Contact
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl font-bold text-[var(--foreground)] mb-4"
        >
          お問い合わせ
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-[var(--muted)] mb-12"
        >
          Shopifyストアの構築・リニューアル・運用改善など、お気軽にご相談ください。
          通常2営業日以内にご返信いたします。
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-[var(--foreground)] mb-2"
            >
              お名前 <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="山田 太郎"
              className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-white text-[var(--foreground)] placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-shadow text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[var(--foreground)] mb-2"
            >
              メールアドレス <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-white text-[var(--foreground)] placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-shadow text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-[var(--foreground)] mb-2"
            >
              お問い合わせ内容 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              placeholder="ご依頼内容・ご質問をお書きください"
              className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-white text-[var(--foreground)] placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-shadow text-sm resize-none"
            />
          </div>

          {status === "success" && (
            <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm">
              お問い合わせを受け付けました。2営業日以内にご返信いたします。
            </div>
          )}
          {status === "error" && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
              送信に失敗しました。時間をおいて再度お試しください。
            </div>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full py-3.5 rounded-full bg-[var(--accent)] text-white font-semibold text-sm hover:bg-[var(--accent-dark)] disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-md hover:shadow-lg cursor-pointer"
          >
            {status === "sending" ? "送信中..." : "送信する"}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
