'use client';

import { FormEvent, useMemo, useState } from 'react';
import {
  ArrowRight,
  Check,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  Trash2,
  X,
} from 'lucide-react';

type Product = {
  id: number;
  name: string;
  price: number;
  tag: string;
  category: string;
  description: string;
  image: string;
};

type CartItem = Product & {
  quantity: number;
};

const products: Product[] = [
  {
    id: 1,
    name: 'Core Oversized Tee',
    price: 38,
    tag: 'New',
    category: 'Tees',
    description: 'Heavy-soft cotton tee with a relaxed premium fit.',
    image:
      'https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    name: 'Sand Relaxed Hoodie',
    price: 68,
    tag: 'Drop',
    category: 'Hoodies',
    description: 'Warm neutral hoodie made for clean everyday layering.',
    image:
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    name: 'Washed Utility Pants',
    price: 74,
    tag: 'Best',
    category: 'Pants',
    description: 'Soft structured pants with a minimal utility shape.',
    image:
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 4,
    name: 'Everyday Box Jacket',
    price: 89,
    tag: 'Limited',
    category: 'Outerwear',
    description: 'Boxy everyday jacket with quiet luxury styling.',
    image:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
  },
];

const categories = ['All', 'Tees', 'Hoodies', 'Pants', 'Outerwear'];

const values = [
  'Minimal silhouettes',
  'Neutral everyday tones',
  'Premium comfort fits',
  'Made for repeat wear',
];

const premiumFeatures = [
  {
    title: 'Conversion-ready structure',
    description:
      'Hero, proof points, visual storytelling, product highlights, offer section, FAQ-style messaging, and strong CTAs.',
  },
  {
    title: 'Interactive front-end features',
    description:
      'Search, category filters, cart drawer, quantity controls, toast notifications, mobile menu, and validated forms.',
  },
  {
    title: 'Premium brand presentation',
    description:
      'Editorial imagery, polished spacing, refined typography, hover states, soft shadows, and luxury-inspired neutral styling.',
  },
  {
    title: 'Deployment-ready setup',
    description:
      'SEO metadata, Open Graph preview, sitemap, robots route, custom loading state, custom 404 page, and clean source code.',
  },
];

const caseStudyStats = [
  { label: 'Responsive sections', value: '10+' },
  { label: 'Interactive features', value: '8' },
  { label: 'Target package', value: 'Premium' },
  { label: 'Build focus', value: 'Conversion' },
];

const projectProcess = [
  'Clarify brand direction, target audience, and page goal.',
  'Design a polished visual structure with premium spacing and hierarchy.',
  'Build a responsive front-end with useful interactions and animations.',
  'Prepare SEO, social preview, deployment files, and portfolio-ready docs.',
];

function formatPrice(value: number) {
  return `$${value.toFixed(0)}`;
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [email, setEmail] = useState('');
  const [toast, setToast] = useState('');

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        activeCategory === 'All' || product.category === activeCategory;
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(''), 2600);
  }

  function addToCart(product: Product) {
    setCartItems((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });

    setCartOpen(true);
    showToast(`${product.name} added to cart`);
  }

  function updateCartQuantity(id: number, change: number) {
    setCartItems((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function removeFromCart(id: number) {
    setCartItems((current) => current.filter((item) => item.id !== id));
    showToast('Item removed from cart');
  }

  async function handleNewsletterSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

    if (!validEmail) {
      showToast('Please enter a valid email address');
      return;
    }

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        showToast(data.message ?? 'Please try again.');
        return;
      }

      setEmail('');
      showToast(data.message ?? 'You are on the Xans drop list');
    } catch {
      showToast('Newsletter demo is temporarily unavailable');
    }
  }

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  return (
    <main className="min-h-screen bg-cream text-ink">
      <header className="sticky top-0 z-50 border-b border-ink/10 bg-cream/85 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
          <a href="#" className="text-2xl font-bold tracking-[0.32em]">
            XANS
          </a>

          <div className="hidden items-center gap-10 text-xs font-semibold uppercase tracking-[0.18em] text-muted lg:flex">
            <a href="#new">New Arrivals</a>
            <a href="#features">Features</a>
            <a href="#lookbook">Lookbook</a>
            <a href="#case-study">Case Study</a>
            <a href="#story">Story</a>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#new"
              className="hidden rounded-full border border-ink/15 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] lg:inline-flex"
            >
              Search
            </a>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative rounded-full bg-ink p-3 text-cream"
              aria-label="Open cart"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-sand text-xs font-bold text-ink">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="lg:hidden"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div className="border-t border-ink/10 bg-cream px-5 py-5 shadow-soft lg:hidden">
            <div className="mx-auto grid max-w-7xl gap-4 text-sm font-semibold uppercase tracking-[0.18em] text-muted">
              <a href="#new" onClick={closeMobileMenu}>
                New Arrivals
              </a>
              <a href="#features" onClick={closeMobileMenu}>
                Features
              </a>
              <a href="#lookbook" onClick={closeMobileMenu}>
                Lookbook
              </a>
              <a href="#case-study" onClick={closeMobileMenu}>
                Case Study
              </a>
              <a href="#story" onClick={closeMobileMenu}>
                Story
              </a>
            </div>
          </div>
        )}
      </header>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-14 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:pb-28 lg:pt-20">
        <div className="flex flex-col justify-center">
          <div className="mb-7 flex flex-wrap gap-3">
            <span className="rounded-full border border-ink/10 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Premium Landing Page Package
            </span>
            <span className="rounded-full border border-ink/10 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Interactive Front-End
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
              href="#case-study"
              className="inline-flex items-center justify-center rounded-full border border-ink px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] transition hover:-translate-y-0.5"
            >
              View case study
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
            10/10 Premium Demo
          </div>
          <div className="absolute bottom-6 left-6 right-6 rounded-[2rem] border border-white/25 bg-cream/85 p-6 backdrop-blur-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted">
              Client-ready package
            </p>
            <div className="mt-3 flex items-end justify-between gap-6">
              <h2 className="text-3xl font-bold tracking-[-0.04em]">
                Design, interactions, SEO, backend demo, deployment prep.
              </h2>
              <Sparkles className="hidden text-ink sm:block" size={28} />
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-ink py-6 text-cream">
        <div className="marquee flex w-[200%] gap-12 whitespace-nowrap text-lg font-semibold uppercase tracking-[0.35em] opacity-90">
          <span>Interactive Cart</span>
          <span>Product Search</span>
          <span>Email API</span>
          <span>SEO Metadata</span>
          <span>Custom 404</span>
          <span>Open Graph</span>
          <span>Interactive Cart</span>
          <span>Product Search</span>
          <span>Email API</span>
          <span>SEO Metadata</span>
          <span>Custom 404</span>
          <span>Open Graph</span>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="mb-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-muted">
              Premium Package
            </p>
            <h2 className="mt-4 text-5xl font-bold leading-tight tracking-[-0.06em]">
              Built like a client-ready landing page, not just a pretty mockup.
            </h2>
          </div>
          <p className="text-lg leading-8 text-muted">
            This sample demonstrates what your premium Fiverr offer can include:
            polished design, conversion structure, real front-end interactions,
            SEO setup, social preview, and deployment-ready files.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {premiumFeatures.map((feature, index) => (
            <article
              key={feature.title}
              className="rounded-[2rem] border border-ink/10 bg-white/55 p-7 shadow-sm transition hover:-translate-y-2 hover:shadow-soft"
            >
              <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-ink text-cream">
                {String(index + 1).padStart(2, '0')}
              </div>
              <h3 className="text-xl font-bold tracking-[-0.04em]">
                {feature.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-muted">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="lookbook"
        className="mx-auto grid max-w-7xl gap-10 px-5 py-24 lg:grid-cols-[0.8fr_1.2fr] lg:px-8"
      >
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
        <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-muted">
              New Arrivals
            </p>
            <h2 className="mt-4 text-5xl font-bold tracking-[-0.06em]">
              Latest essentials
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-muted">
            Search, filter, and add products to the interactive cart. This turns
            the landing page into a stronger premium front-end sample.
          </p>
        </div>

        <div className="mb-10 grid gap-4 rounded-[2rem] border border-ink/10 bg-white/55 p-4 shadow-sm md:grid-cols-[1fr_auto] md:items-center">
          <label className="relative block">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-muted"
              size={18}
            />
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search products, categories, or details..."
              className="h-14 w-full rounded-full border border-ink/10 bg-cream pl-12 pr-5 text-sm outline-none transition focus:border-ink/30"
            />
          </label>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] transition ${
                  activeCategory === category
                    ? 'bg-ink text-cream'
                    : 'border border-ink/10 bg-cream text-muted'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <article key={product.id} className="group">
              <div className="relative h-[390px] overflow-hidden rounded-[2rem] bg-stone shadow-sm">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <span className="absolute left-5 top-5 rounded-full bg-cream px-4 py-2 text-xs font-bold uppercase tracking-[0.2em]">
                  {product.tag}
                </span>
                <button
                  type="button"
                  onClick={() => addToCart(product)}
                  className="absolute bottom-5 left-5 right-5 inline-flex items-center justify-center gap-2 rounded-full bg-cream px-5 py-4 text-xs font-bold uppercase tracking-[0.18em] text-ink opacity-0 shadow-soft transition group-hover:translate-y-0 group-hover:opacity-100"
                >
                  Add to cart <Plus size={15} />
                </button>
              </div>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold tracking-[-0.03em]">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    {product.description}
                  </p>
                </div>
                <p className="font-semibold text-muted">
                  {formatPrice(product.price)}
                </p>
              </div>
            </article>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="rounded-[2rem] border border-ink/10 bg-white/60 p-10 text-center">
            <p className="text-lg font-semibold">No products found.</p>
            <p className="mt-2 text-muted">
              Try a different keyword or category filter.
            </p>
          </div>
        )}
      </section>

      <section
        id="collection"
        className="mx-auto max-w-7xl px-5 py-24 lg:px-8"
      >
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

      <section id="case-study" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="overflow-hidden rounded-[2.5rem] bg-ink text-cream shadow-soft">
          <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-[0.9fr_1.1fr] lg:p-16">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-sand">
                Portfolio Case Study
              </p>
              <h2 className="mt-5 text-5xl font-bold leading-tight tracking-[-0.06em]">
                From brand idea to premium interactive landing page.
              </h2>
              <p className="mt-6 text-lg leading-8 text-sand">
                Xans was created as a portfolio-grade example of a client-ready
                premium landing page package for fashion, product, app, SaaS, or
                brand launches.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {caseStudyStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[2rem] border border-cream/10 bg-cream/10 p-6"
                >
                  <p className="text-4xl font-bold tracking-[-0.06em]">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-sm font-semibold uppercase tracking-[0.16em] text-sand">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid border-t border-cream/10 lg:grid-cols-4">
            {projectProcess.map((step, index) => (
              <div
                key={step}
                className="border-cream/10 p-8 lg:border-r last:lg:border-r-0"
              >
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-sand">
                  Step {index + 1}
                </p>
                <p className="mt-4 leading-7 text-cream/90">{step}</p>
              </div>
            ))}
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
            <form
              onSubmit={handleNewsletterSubmit}
              className="mt-9 flex max-w-xl flex-col gap-3 sm:flex-row"
            >
              <input
                aria-label="Email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email address"
                className="min-h-14 flex-1 rounded-full border border-white/15 bg-cream px-6 text-ink outline-none"
              />
              <button
                type="submit"
                className="rounded-full bg-cream px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-ink"
              >
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

      <div
        className={`fixed inset-0 z-[80] bg-ink/40 backdrop-blur-sm transition ${
          cartOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setCartOpen(false)}
      />

      <aside
        className={`fixed right-0 top-0 z-[90] flex h-full w-full max-w-md flex-col bg-cream shadow-soft transition duration-500 ${
          cartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Shopping cart drawer"
      >
        <div className="flex items-center justify-between border-b border-ink/10 p-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-muted">
              Shopping Cart
            </p>
            <h3 className="mt-2 text-2xl font-bold tracking-[-0.04em]">
              {cartCount} {cartCount === 1 ? 'item' : 'items'} selected
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setCartOpen(false)}
            className="rounded-full border border-ink/10 p-3"
            aria-label="Close cart"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="rounded-[2rem] border border-ink/10 bg-white/60 p-8 text-center">
              <ShoppingBag className="mx-auto text-muted" size={34} />
              <p className="mt-4 text-lg font-semibold">Your cart is empty.</p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Add products from the new arrivals section to preview the
                premium cart drawer experience.
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-[86px_1fr] gap-4 rounded-[1.5rem] border border-ink/10 bg-white/60 p-3"
              >
                <div className="h-24 overflow-hidden rounded-[1.2rem] bg-stone">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-bold tracking-[-0.03em]">
                        {item.name}
                      </h4>
                      <p className="mt-1 text-sm text-muted">
                        {formatPrice(item.price)} each
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="rounded-full p-2 text-muted hover:text-ink"
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 rounded-full border border-ink/10 bg-cream p-1">
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.id, -1)}
                        className="rounded-full p-2"
                        aria-label={`Decrease ${item.name} quantity`}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="min-w-6 text-center text-sm font-bold">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.id, 1)}
                        className="rounded-full p-2"
                        aria-label={`Increase ${item.name} quantity`}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <p className="font-bold">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-ink/10 p-6">
          <div className="mb-5 flex items-center justify-between text-lg font-bold">
            <span>Total</span>
            <span>{formatPrice(cartTotal)}</span>
          </div>
          <button
            type="button"
            onClick={() =>
              showToast(
                cartCount > 0
                  ? 'Checkout preview only for this portfolio demo'
                  : 'Add an item before checkout',
              )
            }
            className="w-full rounded-full bg-ink px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-cream"
          >
            Checkout Preview
          </button>
          <p className="mt-4 text-center text-xs leading-5 text-muted">
            Demo cart UI for front-end portfolio presentation. Payment is not
            connected.
          </p>
        </div>
      </aside>

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 rounded-full bg-ink px-6 py-4 text-sm font-semibold text-cream shadow-soft">
          {toast}
        </div>
      )}
    </main>
  );
}
