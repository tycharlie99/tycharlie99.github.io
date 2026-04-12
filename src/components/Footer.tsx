export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-sm text-muted">
            © {currentYear} TsungYu Chan. Built with Next.js & Tailwind.
          </p>
        </div>
      </div>
    </footer>
  );
}
