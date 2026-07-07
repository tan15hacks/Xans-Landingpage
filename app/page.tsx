import { ArrowRight, Check, Menu, ShoppingBag, Sparkles } from 'lucide-react';

const products = [
  {
    name: 'Core Oversized Tee',
    price: '$38',
    tag: 'New',
    image:
      'https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Sand Relaxed Hoodie',
    price: '$68',
    tag: 'Drop',
    image:
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Washed Utility Pants',
    price: '$74',
    tag: 'Best',
    image:
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Everyday Box Jacket',
    price: '$89',
    tag: 'Limited',
    image:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
  },
];

const values = [
  'Minimal silhouettes',
  'Neutral everyday tones',
  'Premium comfort fits',
  'Made for repeat wear',
];

export default function Home() {
  return (
    <main className="min-h-screen bg-cream text-ink">
      <header className="sticky top-0 z-50 border-b border-ink/10 bg-cream/85 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
          <a href="#" className="text-2xl font-bold tracking-[0.32em]">
            XANS
          </a>

          <div className="hidden items-center gap-10 text-xs font-semibold uppercase tracking-[0.18em] text-muted lg:flex">
            <a href="#new">New Arrivals</a>
            <a href="#lookbook">Lookbook</a>
            <a href="#collection">Collection</a>
            <a href="#story">Story</a>
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden rounded-full border border-ink/15 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] lg:block">
              Search
            </button>
            <button className="rounded-full bg-ink p-3 text-cream">
              <ShoppingBag size={18} />
            </button>
            <button className="lg:hidden">
              <Menu size={24} />
            </button>
          </div>
        </nav>
      </header>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-14 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:pb-28 lg:pt-20">
        <div className="flex flex-col justify-center">
          <div className="mb-7 flex flex-wrap gap-3">
            <span className="rounded-full border border-ink/10 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              2026 Essential Drop
            </span>
            <span className="rounded-full border border-ink/10 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Minimal Apparel
            </span>
          </div>

          <h1 className="max-w-3xl text-6xl font-bold leading-[0.92] tracking-[-0.07em] sm:text-7xl lg:text-8xl">
            Quiet clothing for people with loud standards.
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-muted">
            Xans is a minimal aesthetic clothing label built around calm colors,
            clean silhouettes, comfortable fabrics, and everyday pieces that
            look premium without trying too hard.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#new"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-ink px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-cream transition hover:-translate-y-0.5"
            >
              Shop the drop <ArrowRight size={16} />
            </a>
            <a
              href="#lookbook"
              className="inline-flex items-center justify-center rounded-full border border-ink px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] transition hover:-translate-y-0.5"
            >
              View lookbook
            </a>
          </div>
        </div>

        <div className="relative min-h-[620px] overflow-hidden rounded-[2.5rem] bg-stone shadow-soft image-grain">
          <img
            src="https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=1200&q=80"
            alt="Editorial model wearing minimal clothing"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
          <div className="absolute left-6 top-6 rounded-full bg-cream/90 px-5 py-3 text-xs font-bold uppercase tracking-[0.24em]">
            Drop 01
          </div>
          <div className="absolute bottom-6 left-6 right-6 rounded-[2rem] border border-white/25 bg-cream/85 p-6 backdrop-blur-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted">
              Essential form
            </p>
            <div className="mt-3 flex items-end justify-between gap-6">
              <h2 className="text-3xl font-bold tracking-[-0.04em]">
                Soft silhouettes. Neutral impact.
              </h2>
              <Sparkles className="hidden text-ink sm:block" size={28} />
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-ink py-6 text-cream">
        <div className="marquee flex w-[200%] gap-12 whitespace-nowrap text-lg font-semibold uppercase tracking-[0.35em] opacity-90">
          <span>New Essentials</span>
          <span>Minimal Fits</span>
          <span>Quiet Luxury</span>
          <span>Everyday Form</span>
          <span>Xans Studio</span>
          <span>New Essentials</span>
          <span>Minimal Fits</span>
          <span>Quiet Luxury</span>
          <span>Everyday Form</span>
          <span>Xans Studio</span>
        </div>
      </section>

      <section id="lookbook" className="mx-auto grid max-w-7xl gap-10 px-5 py-24 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div className="flex flex-col justify-center">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-muted">
            Lookbook Preview
          </p>
          <h2 className="mt-5 text-5xl font-bold leading-tight tracking-[-0.06em]">
            Aesthetic pieces styled for everyday motion.
          </h2>
          <p className="mt-6 max-w-md text-lg leading-8 text-muted">
            Editorial product storytelling for a calm, premium clothing brand.
            Replace these visuals with real campaign images once the brand has
            product photography.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="relative h-[520px] overflow-hidden rounded-[2rem] bg-stone sm:row-span-2">
            <img
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80"
              alt="Minimal fashion lookbook outfit"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="relative h-[250px] overflow-hidden rounded-[2rem] bg-sand">
            <img
              src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=900&q=80"
              alt="Clothing fabric detail"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="relative h-[250px] overflow-hidden rounded-[2rem] bg-taupe">
            <img
              src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80"
              alt="Streetwear lifestyle pose"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section id="new" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-muted">
              New Arrivals
            </p>
            <h2 className="mt-4 text-5xl font-bold tracking-[-0.06em]">
              Latest essentials
            </h2>
          </div>
          <a
            href="#"
            className="text-sm font-bold uppercase tracking-[0.22em] underline underline-offset-8"
          >
            View all products
          </a>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <article key={product.name} className="group">
              <div className="relative h-[390px] overflow-hidden rounded-[2rem] bg-stone shadow-sm">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <span className="absolute left-5 top-5 rounded-full bg-cream px-4 py-2 text-xs font-bold uppercase tracking-[0.2em]">
                  {product.tag}
                </span>
              </div>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold tracking-[-0.03em]">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    Minimal apparel · premium everyday fit
                  </p>
                </div>
                <p className="font-semibold text-muted">{product.price}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="collection" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="grid overflow-hidden rounded-[2.5rem] bg-stone lg:grid-cols-[0.9fr_1.1fr]">
          <div className="p-8 sm:p-12 lg:p-16">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-muted">
              Editorial Collection
            </p>
            <h2 className="mt-5 text-5xl font-bold leading-tight tracking-[-0.06em]">
              The monochrome wardrobe system.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-8 text-muted">
              A simple rotation of tees, hoodies, trousers, outerwear, and
              accessories made to mix easily while keeping a clean premium
              aesthetic.
            </p>
            <div className="mt-8 grid gap-4">
              {values.map((value) => (
                <div key={value} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-cream">
                    <Check size={15} />
                  </span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
            <a
              href="#new"
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-cream"
            >
              Explore collection <ArrowRight size={16} />
            </a>
          </div>

          <div className="grid min-h-[620px] grid-cols-2 gap-4 p-5">
            <div className="relative overflow-hidden rounded-[2rem] bg-sand">
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80"
                alt="Xans campaign outfit"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="relative mt-16 overflow-hidden rounded-[2rem] bg-ink">
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80"
                alt="Minimal fashion campaign"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="story" className="bg-ink px-5 py-24 text-cream lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className="relative h-[420px] overflow-hidden rounded-[2rem] bg-sand">
            <img
              src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1000&q=80"
              alt="Premium neutral clothing editorial"
              className="h-full w-full object-cover opacity-90"
            />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-sand">
              Join the drop list
            </p>
            <h2 className="mt-5 max-w-3xl text-5xl font-bold leading-tight tracking-[-0.06em]">
              Get early access to the next Xans drop.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-sand">
              No spam. Just new releases, restocks, lookbook updates, and
              private launch access for people who prefer clean essentials.
            </p>
            <form className="mt-9 flex max-w-xl flex-col gap-3 sm:flex-row">
              <input
                aria-label="Email address"
                placeholder="Email address"
                className="min-h-14 flex-1 rounded-full border border-white/15 bg-cream px-6 text-ink outline-none"
              />
              <button className="rounded-full bg-cream px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-ink">
                Sign up
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="mx-auto grid max-w-7xl gap-10 px-5 py-14 text-sm text-muted md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <p className="text-2xl font-bold tracking-[0.32em] text-ink">XANS</p>
          <p className="mt-4 max-w-sm leading-7">
            Minimal aesthetic apparel studio. Built for calm wardrobes and
            everyday form.
          </p>
        </div>
        <div>
          <p className="font-bold uppercase tracking-[0.18em] text-ink">Shop</p>
          <ul className="mt-4 space-y-3">
            <li>New Arrivals</li>
            <li>Collections</li>
            <li>Lookbook</li>
          </ul>
        </div>
        <div>
          <p className="font-bold uppercase tracking-[0.18em] text-ink">Brand</p>
          <ul className="mt-4 space-y-3">
            <li>About</li>
            <li>Journal</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <p className="font-bold uppercase tracking-[0.18em] text-ink">Social</p>
          <ul className="mt-4 space-y-3">
            <li>Instagram</li>
            <li>TikTok</li>
            <li>Pinterest</li>
          </ul>
        </div>
      </footer>
    </main>
  );
}
