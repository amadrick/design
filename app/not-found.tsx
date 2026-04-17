import Link from "next/link";

export default function NotFound() {
  return (
    <main className="px-7 max-md:px-5 py-16">
      <p className="type-nav text-t11">Page not found.</p>
      <Link href="/" className="type-nav text-t9 hover:text-t11 transition-colors mt-3 inline-block">
        Back to home
      </Link>
    </main>
  );
}
