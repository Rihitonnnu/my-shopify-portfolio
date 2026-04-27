export default function Footer() {
  return (
    <footer className="py-8 px-6 bg-white border-t border-[var(--border)]">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-sm font-semibold text-[var(--foreground)]">Portfolio</span>
        <p className="text-xs text-[var(--muted)]">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
}
