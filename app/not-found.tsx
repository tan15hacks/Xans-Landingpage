import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-5 text-ink">
      <section className="relative w-full max-w-4xl overflow-hidden rounded-[2.5rem] bg-ink p-8 text-cream shadow-soft sm:p-14">
        <div className="absolute right-[-80px] top-[-90px] h-72 w-72 rounded-full bg-sand/25 blur-3xl" />
        <div className="absolute bottom-[-110px] left-[-90px] h-72 w-72 rounded-full bg-stone/10 blur-3xl" />

        <div className="relative z-10">
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-cream/15 bg-cream/10 px-5 py-3 text-xs font-bold uppercase tracking-[0.22em] text-sand">
            <Sparkles size={15} /> 404 Page
          </div>
          <h1 className="max-w-2xl text-5xl font-bold leading-tight tracking-[-0.06em] sm:text-7xl">
            This page slipped out of the collection.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-sand">
            The page you are looking for does not exist, but the Xans premium
            landing page is still waiting for you.
          </p>
          <Link
            href="/"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-cream px-7 py-4 text-sm font-bold uppercase tracking-[0.18em] text-ink"
          >
            <ArrowLeft size={16} /> Back to homepage
          </Link>
        </div>
      </section>
    </main>
  );
}
