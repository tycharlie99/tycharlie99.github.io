import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 relative">
      {/* Background Large Text */}
      <h1 className="text-9xl font-extrabold  tracking-tighter">
        404
      </h1>

      {/* Overlaid Title */}
      <div className="mt-4">
        <h2 className="text-2xl font-bold text-foreground">
          Page Not Found
        </h2>
      </div>

      <p className="mt-8 max-w-md text-muted">
        Sorry, we couldn&apos;t find the page you&apos;re looking for.
      </p>

      <Link
        href="/"
        className="mt-10 px-6 py-2 bg-foreground text-background rounded-full font-medium hover:opacity-90 transition-all active:scale-95"
      >
        Back to Home
      </Link>
    </div>
  );
}
