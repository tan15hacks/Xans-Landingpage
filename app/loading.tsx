export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-cream text-ink">
      <div className="text-center">
        <div className="mx-auto mb-6 h-14 w-14 animate-spin rounded-full border border-ink/10 border-t-ink" />
        <p className="text-2xl font-bold tracking-[0.32em]">XANS</p>
        <p className="mt-3 text-xs font-bold uppercase tracking-[0.22em] text-muted">
          Loading premium experience
        </p>
      </div>
    </main>
  );
}
