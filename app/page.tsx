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

const imageFilter = 'h-full w-full object-cover brightness-95 saturate-75';

const imagery = {
  hero:
    'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=1200&q=80',
  rack:
    'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=900&q=80',
  tee:
    'https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=900&q=80',
  hoodie:
    'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80',
  pants:
    'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80',
  editorial:
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80',
  studio:
    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1000&q=80',
};

const products: Product[] = [
  {
    id: 1,
    name: 'Core Oversized Tee',
    price: 38,
    tag: 'New',
    category: 'Tees',
    description: 'Heavy-soft cotton tee with a relaxed premium fit.',
    image: imagery.tee,
  },
  {
    id: 2,
    name: 'Sand Relaxed Hoodie',
    price: 68,
    tag: 'Drop',
    category: 'Hoodies',
    description: 'Warm neutral hoodie made for clean everyday layering.',
    image: imagery.hoodie,
  },
  {
    id: 3,
    name: 'Washed Utility Pants',
    price: 74,
    tag: 'Best',
    category: 'Pants',
    description: 'Soft structured pants with a minimal utility shape.',
    image: imagery.pants,
  },
  {
    id: 4,
    name: 'Everyday Box Jacket',
    price: 89,
    tag: 'Limited',
    category: 'Outerwear',
    description: 'Boxy everyday jacket with quiet luxury styling.',
    image: imagery.editorial,
  },
];

const categories = ['All', 'Tees', 'Hoodies', 'Pants', 'Outerwear'];

const values = [
  'Minimal silhouettes',
  'Neutral everyday tones',
  'Premium comfort fits',
  'Made for repeat wear',
];

const brandStandards = [
  {
    title: 'Clean wardrobe system',
    description:
      'Every piece is designed to mix easily with the rest of the collection, keeping daily outfits simple and refined.',
  },
  {
    title: 'Soft neutral palette',
    description:
      'Cream, sand, stone, taupe, washed black, and muted tones create a calm signature look for everyday wear.',
  },
  {
    title: 'Relaxed premium fit',
    description:
      'Oversized tees, soft hoodies, structured pants, and boxy outerwear shaped for comfort without looking careless.',
  },
  {
    title: 'Drop-based releases',
    description:
      'Small curated releases keep each collection focused, intentional, and easier to style from season to season.',
  },
];

const collectionStats = [
  { label: 'Essential pieces', value: '04' },
  { label: 'Core colors', value: '06' },
  { label: 'Season', value: '2026' },
  { label: 'Release', value: 'Drop 01' },
];

const wardrobeSteps = [
  'Start with a clean base layer in cream, stone, or washed black.',
  'Add a relaxed hoodie or box jacket for structure and depth.',
  'Balance the silhouette with utility pants or straight-fit bottoms.',
  'Finish with one quiet accent so the whole outfit stays calm.',
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
    showToast(`${product.name} added to bag`);
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
    showToast('Item removed from bag');
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
      showToast('Sign-up is temporarily unavailable');
    }
  }

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  return (
    <main className="min-h-screen bg-cream text-ink">
      <header className="sticky top-0 z-50 border-b border-ink/10 bg-cream/90 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:py-5 lg:px-8">
          <a
            href="#"
            className="text-xl font-bold tracking-[0.26em] sm:text-2xl sm:tracking-[0.32em]"
          >
            XANS
          </a>

          <div className="hidden items-center gap-10 text-xs font-semibold uppercase tracking-[0.18em] text-muted lg:flex">
            <a href="#new">New Arrivals</a>
            <a href="#standard">The Standard</a>
            <a href="#lookbook">Lookbook</a>
            <a href="#collection">Collection</a>
            <a href="#story">Drop List</a>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="#new"
              className="hidden rounded-full border border-ink/15 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] lg:inline-flex"
            >
              Search
            </a>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative rounded-full bg-ink p-3 text-cream shadow-sm"
              aria-label="Open bag"
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
              className="rounded-full border border-ink/10 p-3 lg:hidden"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div className="border-t border-ink/10 bg-cream px-5 py-5 shadow-soft lg:hidden">
            <div className="mx-auto grid max-w-7xl gap-4 text-sm font-semibold uppercase tracking-[0.18em] text-muted">
              <a href="#new" onClick={closeMobileMenu}>
                New Arrivals
              </a>
              <a href="#standard" onClick={closeMobileMenu}>
                The Standard
              </a>
              <a href="#lookbook" onClick={closeMobileMenu}>
                Lookbook
              </a>
              <a href="#collection" onClick={closeMobileMenu}>
                Collection
              </a>
              <a href="#story" onClick={closeMobileMenu}>
                Drop List
              </a>
            </div>
          </div>
        )}
      </header>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-12 sm:pb-20 sm:pt-14 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:pb-28 lg:pt-20">
        <div className="flex flex-col justify-center">
          <div className="mb-6 flex flex-wrap gap-2 sm:gap-3">
            <span className="rounded-full border border-ink/10 bg-white/70 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted sm:text-xs sm:tracking-[0.2em]">
              2026 Essential Drop
            </span>
            <span className="rounded-full border border-ink/10 bg-white/70 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted sm:text-xs sm:tracking-[0.2em]">
              Minimal Apparel
            </span>
          </div>

          <h1 className="max-w-3xl text-5xl font-bold leading-[0.95] tracking-[-0.06em] sm:text-7xl sm:leading-[0.92] lg:text-8xl lg:tracking-[-0.07em]">
            Quiet clothing for people with loud standards.
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-muted sm:mt-8 sm:text-lg sm:leading-8">
            Xans is a minimal aesthetic clothing label built around calm colors,
            clean silhouettes, comfortable fabrics, and everyday pieces that
            look premium without trying too hard.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
            <a
              href="#new"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-ink px-7 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-cream transition hover:-translate-y-0.5 sm:text-sm"
            >
              Shop the drop <ArrowRight size={16} />
            </a>
            <a
              href="#lookbook"
              className="inline-flex items-center justify-center rounded-full border border-ink px-7 py-4 text-xs font-semibold uppercase tracking-[0.18em] transition hover:-translate-y-0.5 sm:text-sm"
            >
              View lookbook
            </a>
          </div>
        </div>

        <div className="relative min-h-[480px] overflow-hidden rounded-[2rem] bg-stone shadow-soft image-grain sm:min-h-[560px] sm:rounded-[2.5rem] lg:min-h-[620px]">
          <img src={imagery.hero} alt="Editorial model wearing minimal clothing" className={imageFilter} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
          <div className="absolute left-5 top-5 rounded-full bg-cream/90 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] sm:left-6 sm:top-6 sm:px-5 sm:py-3 sm:text-xs sm:tracking-[0.24em]">
            Drop 01
          </div>
          <div className="absolute bottom-5 left-5 right-5 rounded-[1.6rem] border border-white/25 bg-cream/88 p-5 backdrop-blur-xl sm:bottom-6 sm:left-6 sm:right-6 sm:rounded-[2rem] sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted sm:text-sm sm:tracking-[0.24em]">
              Essential form
            </p>
            <div className="mt-3 flex items-end justify-between gap-5">
              <h2 className="text-2xl font-bold tracking-[-0.04em] sm:text-3xl">
                Soft silhouettes. Neutral impact.
              </h2>
              <Sparkles className="hidden text-ink sm:block" size={28} />
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-ink py-5 text-cream sm:py-6">
        <div className="marquee flex w-[200%] gap-10 whitespace-nowrap text-sm font-semibold uppercase tracking-[0.3em] opacity-90 sm:gap-12 sm:text-lg sm:tracking-[0.35em]">
          <span>New Essentials</span>
          <span>Minimal Fits</span>
          <span>Quiet Luxury</span>
          <span>Everyday Form</span>
          <span>Xans Studio</span>
          <span>Soft Neutrals</span>
          <span>New Essentials</span>
          <span>Minimal Fits</span>
          <span>Quiet Luxury</span>
          <span>Everyday Form</span>
          <span>Xans Studio</span>
          <span>Soft Neutrals</span>
        </div>
      </section>

      <section id="standard" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
        <div className="mb-10 grid gap-5 lg:mb-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-muted">
              The Xans Standard
            </p>
            <h2 className="mt-4 text-4xl font-bold leading-tight tracking-[-0.06em] sm:text-5xl">
              Designed for calm wardrobes and everyday confidence.
            </h2>
          </div>
          <p className="text-base leading-7 text-muted sm:text-lg sm:leading-8">
            Xans focuses on fewer pieces with stronger versatility: clean forms,
            soft textures, neutral tones, and silhouettes that work across the
            week without feeling repetitive.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {brandStandards.map((feature, index) => (
            <article
              key={feature.title}
              className="rounded-[1.6rem] border border-ink/10 bg-white/60 p-6 shadow-sm transition hover:-translate-y-2 hover:shadow-soft sm:rounded-[2rem] sm:p-7"
            >
              <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-full bg-ink text-sm font-bold text-cream sm:mb-8 sm:h-12 sm:w-12">
                {String(index + 1).padStart(2, '0')}
              </div>
              <h3 className="text-lg font-bold tracking-[-0.04em] sm:text-xl">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted sm:mt-4">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="lookbook"
        className="mx-auto grid max-w-7xl gap-9 px-5 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 lg:py-24"
      >
        <div className="flex flex-col justify-center">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-muted">
            Lookbook Preview
          </p>
          <h2 className="mt-5 text-4xl font-bold leading-tight tracking-[-0.06em] sm:text-5xl">
            Aesthetic pieces styled for everyday motion.
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-muted sm:mt-6 sm:text-lg sm:leading-8">
            A visual direction built on comfortable essentials, quiet contrast,
            and minimal styling that feels polished without being loud.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          <div className="relative h-[430px] overflow-hidden rounded-[1.6rem] bg-stone sm:h-[520px] sm:rounded-[2rem] sm:row-span-2">
            <img src={imagery.editorial} alt="Minimal fashion lookbook outfit" className={imageFilter} />
          </div>
          <div className="relative h-[220px] overflow-hidden rounded-[1.6rem] bg-sand sm:h-[250px] sm:rounded-[2rem]">
            <img src={imagery.rack} alt="Neutral clothing rack detail" className={imageFilter} />
          </div>
          <div className="relative h-[220px] overflow-hidden rounded-[1.6rem] bg-taupe sm:h-[250px] sm:rounded-[2rem]">
            <img src={imagery.tee} alt="Minimal clothing detail" className={imageFilter} />
          </div>
        </div>
      </section>

      <section id="new" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="mb-7 flex flex-col justify-between gap-5 sm:mb-8 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-muted">
              New Arrivals
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-[-0.06em] sm:text-5xl">
              Latest essentials
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-muted">
            Explore the first Xans release by category, style, and everyday fit.
            Add pieces to your bag and build a clean rotation.
          </p>
        </div>

        <div className="mb-8 grid gap-4 rounded-[1.6rem] border border-ink/10 bg-white/60 p-3 shadow-sm sm:mb-10 sm:rounded-[2rem] sm:p-4 md:grid-cols-[1fr_auto] md:items-center">
          <label className="relative block">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-muted"
              size={18}
            />
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search products..."
              className="h-14 w-full rounded-full border border-ink/10 bg-cream pl-12 pr-5 text-sm outline-none transition focus:border-ink/30"
            />
          </label>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-3.5 py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] transition sm:px-4 sm:py-3 sm:text-xs sm:tracking-[0.16em] ${
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

        <div className="grid gap-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <article key={product.id} className="group">
              <div className="relative h-[360px] overflow-hidden rounded-[1.6rem] bg-stone shadow-sm sm:h-[390px] sm:rounded-[2rem]">
                <img
                  src={product.image}
                  alt={product.name}
                  className={`${imageFilter} transition duration-700 group-hover:scale-105`}
                />
                <span className="absolute left-4 top-4 rounded-full bg-cream px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] sm:left-5 sm:top-5 sm:px-4 sm:text-xs sm:tracking-[0.2em]">
                  {product.tag}
                </span>
                <button
                  type="button"
                  onClick={() => addToCart(product)}
                  className="absolute bottom-4 left-4 right-4 inline-flex items-center justify-center gap-2 rounded-full bg-cream px-5 py-4 text-xs font-bold uppercase tracking-[0.18em] text-ink opacity-100 shadow-soft transition lg:bottom-5 lg:left-5 lg:right-5 lg:translate-y-3 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100"
                >
                  Add to bag <Plus size={15} />
                </button>
              </div>
              <div className="mt-4 flex items-start justify-between gap-4 sm:mt-5">
                <div>
                  <h3 className="text-base font-bold tracking-[-0.03em] sm:text-lg">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-muted">
                    {product.description}
                  </p>
                </div>
                <p className="shrink-0 font-semibold text-muted">
                  {formatPrice(product.price)}
                </p>
              </div>
            </article>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="rounded-[1.6rem] border border-ink/10 bg-white/60 p-8 text-center sm:rounded-[2rem] sm:p-10">
            <p className="text-lg font-semibold">No products found.</p>
            <p className="mt-2 text-muted">
              Try a different keyword or category filter.
            </p>
          </div>
        )}
      </section>

      <section
        id="collection"
        className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24"
      >
        <div className="grid overflow-hidden rounded-[2rem] bg-stone lg:grid-cols-[0.9fr_1.1fr] lg:rounded-[2.5rem]">
          <div className="p-7 sm:p-12 lg:p-16">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-muted">
              Editorial Collection
            </p>
            <h2 className="mt-5 text-4xl font-bold leading-tight tracking-[-0.06em] sm:text-5xl">
              The monochrome wardrobe system.
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-muted sm:mt-6 sm:text-lg sm:leading-8">
              A simple rotation of tees, hoodies, trousers, outerwear, and
              accessories made to mix easily while keeping a clean premium
              aesthetic.
            </p>
            <div className="mt-7 grid gap-4 sm:mt-8">
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
              className="mt-9 inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-cream sm:mt-10 sm:text-sm"
            >
              Explore collection <ArrowRight size={16} />
            </a>
          </div>

          <div className="grid min-h-[460px] grid-cols-2 gap-3 p-4 sm:min-h-[620px] sm:gap-4 sm:p-5">
            <div className="relative overflow-hidden rounded-[1.5rem] bg-sand sm:rounded-[2rem]">
              <img src={imagery.rack} alt="Neutral Xans wardrobe rack" className={imageFilter} />
            </div>
            <div className="relative mt-10 overflow-hidden rounded-[1.5rem] bg-ink sm:mt-16 sm:rounded-[2rem]">
              <img src={imagery.editorial} alt="Minimal fashion campaign" className={imageFilter} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
        <div className="overflow-hidden rounded-[2rem] bg-ink text-cream shadow-soft lg:rounded-[2.5rem]">
          <div className="grid gap-8 p-7 sm:p-12 lg:grid-cols-[0.9fr_1.1fr] lg:p-16">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-sand">
                Collection Notes
              </p>
              <h2 className="mt-5 text-4xl font-bold leading-tight tracking-[-0.06em] sm:text-5xl">
                Built around fewer decisions and better everyday pieces.
              </h2>
              <p className="mt-5 text-base leading-7 text-sand sm:mt-6 sm:text-lg sm:leading-8">
                The first Xans drop keeps the wardrobe focused: essential tops,
                soft layers, structured bottoms, and clean outerwear made for
                repeated wear.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {collectionStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[1.6rem] border border-cream/10 bg-cream/10 p-5 sm:rounded-[2rem] sm:p-6"
                >
                  <p className="text-3xl font-bold tracking-[-0.06em] sm:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-sand sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid border-t border-cream/10 lg:grid-cols-4">
            {wardrobeSteps.map((step, index) => (
              <div
                key={step}
                className="border-cream/10 p-7 lg:border-r lg:p-8 last:lg:border-r-0"
              >
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-sand">
                  Style {index + 1}
                </p>
                <p className="mt-4 leading-7 text-cream/90">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="story" className="bg-ink px-5 py-20 text-cream lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-12">
          <div className="relative h-[360px] overflow-hidden rounded-[1.6rem] bg-sand sm:h-[420px] sm:rounded-[2rem]">
            <img src={imagery.studio} alt="Premium neutral clothing editorial" className={imageFilter} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-sand">
              Join the drop list
            </p>
            <h2 className="mt-5 max-w-3xl text-4xl font-bold leading-tight tracking-[-0.06em] sm:text-5xl">
              Get early access to the next Xans drop.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-sand sm:mt-6 sm:text-lg sm:leading-8">
              No spam. Just new releases, restocks, lookbook updates, and
              private launch access for people who prefer clean essentials.
            </p>
            <form
              onSubmit={handleNewsletterSubmit}
              className="mt-8 flex max-w-xl flex-col gap-3 sm:mt-9 sm:flex-row"
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

      <footer className="mx-auto grid max-w-7xl gap-9 px-5 py-12 text-sm text-muted md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr] lg:px-8 lg:py-14">
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
        aria-label="Shopping bag drawer"
      >
        <div className="flex items-center justify-between border-b border-ink/10 p-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-muted">
              Shopping Bag
            </p>
            <h3 className="mt-2 text-2xl font-bold tracking-[-0.04em]">
              {cartCount} {cartCount === 1 ? 'item' : 'items'} selected
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setCartOpen(false)}
            className="rounded-full border border-ink/10 p-3"
            aria-label="Close bag"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="rounded-[2rem] border border-ink/10 bg-white/60 p-8 text-center">
              <ShoppingBag className="mx-auto text-muted" size={34} />
              <p className="mt-4 text-lg font-semibold">Your bag is empty.</p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Add essentials from the new arrivals section and build your Xans
                rotation.
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-[86px_1fr] gap-4 rounded-[1.5rem] border border-ink/10 bg-white/60 p-3"
              >
                <div className="h-24 overflow-hidden rounded-[1.2rem] bg-stone">
                  <img src={item.image} alt={item.name} className={imageFilter} />
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
                  ? 'Checkout opens soon for the next Xans drop'
                  : 'Add an item before checkout',
              )
            }
            className="w-full rounded-full bg-ink px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-cream"
          >
            Continue to checkout
          </button>
          <p className="mt-4 text-center text-xs leading-5 text-muted">
            Checkout will open when the next Xans release goes live.
          </p>
        </div>
      </aside>

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-[100] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 rounded-full bg-ink px-6 py-4 text-center text-sm font-semibold text-cream shadow-soft sm:w-auto">
          {toast}
        </div>
      )}
    </main>
  );
}
