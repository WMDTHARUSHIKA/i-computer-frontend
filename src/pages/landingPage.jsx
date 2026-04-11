// LandingPage.jsx
import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  BiChevronLeft,
  BiChevronRight,
  BiLaptop,
  BiDesktop,
  BiHeadphone,
  BiChip,
  BiShieldQuarter,
  BiSupport,
  BiPackage,
} from "react-icons/bi";

function formatLKR(value) {
  return `LKR ${Number(value || 0).toLocaleString()}`;
}

/* ---------------------------
   Brand buttons (simple)
---------------------------- */
const btnPrimary =
  "h-[50px] px-6 rounded-2xl bg-[#48A111] text-black font-black flex items-center justify-center hover:bg-[#3D8F0F] transition";
const btnSecondary =
  "h-[50px] px-6 rounded-2xl bg-black text-[#F1F0E9] font-black flex items-center justify-center hover:opacity-90 transition";
const btnOutline =
  "h-[50px] px-6 rounded-2xl border border-black/20 text-black font-black flex items-center justify-center hover:bg-black hover:text-[#F1F0E9] transition";

/* ---------------------------
   Loading skeleton
---------------------------- */
function ProductSkeleton() {
  return (
    <div className="min-w-[270px] max-w-[270px] rounded-3xl bg-white border border-black/10 shadow-sm overflow-hidden animate-pulse">
      <div className="h-[220px] bg-[#F1F0E9]" />
      <div className="p-4">
        <div className="h-4 w-24 bg-[#F1F0E9] rounded mb-3" />
        <div className="h-5 w-full bg-[#F1F0E9] rounded mb-2" />
        <div className="h-5 w-3/4 bg-[#F1F0E9] rounded mb-4" />
        <div className="h-6 w-28 bg-[#F1F0E9] rounded mb-4" />
        <div className="h-11 w-full bg-[#F1F0E9] rounded-2xl" />
      </div>
    </div>
  );
}

function PriceBlock({ price, labelledPrice }) {
  const p = Number(price || 0);
  const lp = Number(labelledPrice || 0);
  const hasDiscount = lp > 0 && p > 0 && lp > p;

  return (
    <div className="flex items-end gap-2 flex-wrap">
      <span className="text-xl font-black text-[#48A111]">{formatLKR(p)}</span>
      {hasDiscount && (
        <span className="text-sm text-black/40 line-through">{formatLKR(lp)}</span>
      )}
    </div>
  );
}

/* ---------------------------
   Product card (VIEW/BUY colors: #000000, #F1F0E9)
---------------------------- */
function ProductSlideCard({ product }) {
  const image = product?.images?.[0] || "/images/default-product-1.png";
  const price = Number(product?.price || 0);
  const labelled = Number(product?.labelledPrice || 0);

  const discount =
    labelled > price && labelled > 0
      ? Math.round(((labelled - price) / labelled) * 100)
      : 0;

  return (
    <div className="min-w-[270px] max-w-[270px] snap-start rounded-3xl bg-white border border-black/10 shadow-sm hover:shadow-lg transition overflow-hidden">
      <div className="relative h-[220px] bg-[#F1F0E9] flex items-center justify-center overflow-hidden">
        {discount > 0 && (
          <div className="absolute left-3 top-3 rounded-full bg-black text-[#F1F0E9] text-xs font-black px-3 py-1">
            -{discount}%
          </div>
        )}

        <img
          src={image}
          alt={product?.name || "Product"}
          className="h-[180px] w-[180px] object-contain"
          loading="lazy"
        />
      </div>

      <div className="p-4">
        <p className="text-xs font-black text-black/60 uppercase tracking-wide">
          {product?.category || product?.brand || "Computer Product"}
        </p>

        <h3 className="text-black font-extrabold text-base leading-6 line-clamp-2 min-h-[48px] mt-2">
          {product?.name || "Product Name"}
        </h3>

        <div className="mt-4">
          <PriceBlock price={product?.price} labelledPrice={product?.labelledPrice} />
        </div>

        {/* VIEW/BUY updated */}
        <div className="mt-4 flex gap-2">
          <Link
            to={`/overview/${product?.productId}`}
            className="flex-1 h-[44px] rounded-2xl bg-[#000000] text-[#F1F0E9] flex items-center justify-center font-black hover:opacity-90 transition"
          >
            View
          </Link>

          <Link
            to={`/overview/${product?.productId}`}
            className="flex-1 h-[44px] rounded-2xl bg-[#F1F0E9] text-[#000000] border border-black/20 flex items-center justify-center font-black hover:bg-white transition"
          >
            Buy
          </Link>
        </div>
      </div>
    </div>
  );
}

function ProductRail({ title, subtitle, products }) {
  const railRef = useRef(null);

  const scrollRail = (direction) => {
    if (!railRef.current) return;
    railRef.current.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl lg:text-3xl font-black text-black">{title}</h2>
          <p className="text-black/60 mt-2 max-w-2xl">{subtitle}</p>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => scrollRail("left")}
            className="w-11 h-11 rounded-full border border-black/15 bg-white text-black flex items-center justify-center hover:bg-black hover:text-[#F1F0E9] transition"
            aria-label="Scroll left"
          >
            <BiChevronLeft size={24} />
          </button>
          <button
            onClick={() => scrollRail("right")}
            className="w-11 h-11 rounded-full border border-black/15 bg-white text-black flex items-center justify-center hover:bg-black hover:text-[#F1F0E9] transition"
            aria-label="Scroll right"
          >
            <BiChevronRight size={24} />
          </button>
        </div>
      </div>

      <div
        ref={railRef}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-2 scroll-smooth no-scrollbar"
      >
        {products?.length > 0
          ? products.map((p) => (
              <ProductSlideCard key={p?.productId || p?._id} product={p} />
            ))
          : [1, 2, 3, 4, 5].map((i) => <ProductSkeleton key={i} />)}
      </div>
    </section>
  );
}

function CategoryCard({ icon, title, desc, to }) {
  return (
    <Link
      to={to}
      className="rounded-3xl bg-white border border-black/10 p-6 shadow-sm hover:shadow-lg transition block"
    >
      <div className="w-14 h-14 rounded-2xl bg-[#F1F0E9] flex items-center justify-center text-black mb-4">
        {icon}
      </div>
      <h3 className="text-black text-lg font-black">{title}</h3>
      <p className="text-black/60 mt-2 text-sm leading-6">{desc}</p>
      <div className="mt-4 text-sm font-black text-[#48A111]">Explore →</div>
    </Link>
  );
}

function MiniFeature({ icon, title, desc }) {
  return (
    <div className="rounded-3xl bg-white border border-black/10 p-6 shadow-sm">
      <div className="w-12 h-12 rounded-2xl bg-[#F1F0E9] flex items-center justify-center text-black mb-4">
        {icon}
      </div>
      <h3 className="text-black font-black">{title}</h3>
      <p className="text-black/60 text-sm mt-2 leading-6">{desc}</p>
    </div>
  );
}

/* ---------------------------
   Best product slideshow (hero)
   - auto slide
   - arrows
   - dots
   - VIEW/BUY colors: #000000, #F1F0E9
---------------------------- */
function BestProductSlideshow({ products = [] }) {
  const slides = Array.isArray(products) ? products.filter(Boolean) : [];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 3500);
    return () => clearInterval(t);
  }, [slides.length]);

  if (slides.length === 0) {
    return (
      <div className="col-span-2 rounded-3xl bg-white border border-black/10 p-5">
        <p className="text-black/60 text-sm font-semibold">Best Product</p>
        <p className="text-black font-black mt-2">No products available</p>
      </div>
    );
  }

  const active = slides[index];
  const image = active?.images?.[0] || "/images/default-product-1.png";

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);

  return (
    <div className="col-span-2 rounded-3xl bg-white border border-black/10 p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-black/60 text-sm font-semibold">Best Product</p>
          <p className="text-black font-black mt-1 line-clamp-2">
            {active?.name || "Best product"}
          </p>
        </div>

        {slides.length > 1 && (
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-black/15 bg-[#F1F0E9] text-black hover:bg-black hover:text-[#F1F0E9] transition flex items-center justify-center"
              aria-label="Previous"
              type="button"
            >
              <BiChevronLeft size={22} />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-black/15 bg-[#F1F0E9] text-black hover:bg-black hover:text-[#F1F0E9] transition flex items-center justify-center"
              aria-label="Next"
              type="button"
            >
              <BiChevronRight size={22} />
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-[170px_1fr] gap-4 items-center">
        <div className="h-[160px] rounded-3xl bg-[#F1F0E9] border border-black/10 flex items-center justify-center overflow-hidden">
          <img
            src={image}
            alt={active?.name || "Best product"}
            className="w-[135px] h-[135px] object-contain"
            loading="lazy"
          />
        </div>

        <div className="min-w-0">
          <p className="text-[#48A111] font-black text-lg">
            {formatLKR(active?.price)}
          </p>

          <div className="mt-3 flex gap-2 flex-wrap">
            <Link
              to={`/overview/${active?.productId}`}
              className="h-[44px] px-5 rounded-2xl bg-[#000000] text-[#F1F0E9] font-black flex items-center justify-center hover:opacity-90 transition"
            >
              View
            </Link>

            <Link
              to={`/overview/${active?.productId}`}
              className="h-[44px] px-5 rounded-2xl bg-[#F1F0E9] text-[#000000] border border-black/20 font-black flex items-center justify-center hover:bg-white transition"
            >
              Buy
            </Link>
          </div>

          {slides.length > 1 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  type="button"
                  className={`h-2.5 rounded-full transition ${
                    i === index ? "w-8 bg-black" : "w-2.5 bg-black/20"
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/products/")
      .then((res) => setProducts(Array.isArray(res.data) ? res.data : []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const featuredProducts = useMemo(
    () => [...products].filter((p) => Number(p?.price) > 0).slice(0, 10),
    [products]
  );

  const dealProducts = useMemo(
    () =>
      [...products]
        .filter((p) => Number(p?.labelledPrice) > Number(p?.price))
        .slice(0, 10),
    [products]
  );

  // Use featured products as “best” slideshow items (top 6)
  const bestProducts = useMemo(() => featuredProducts.slice(0, 6), [featuredProducts]);

  const categories = [
    {
      title: "Laptops",
      desc: "Work, study, gaming and creative performance.",
      icon: <BiLaptop size={28} />,
      to: "/products?category=Laptops",
    },
    {
      title: "Desktop PCs",
      desc: "Reliable performance with upgrade flexibility.",
      icon: <BiDesktop size={28} />,
      to: "/products?category=Desktops",
    },
    {
      title: "Accessories",
      desc: "Keyboards, mice, headsets, storage and more.",
      icon: <BiHeadphone size={28} />,
      to: "/products?category=Accessories",
    },
    {
      title: "Components",
      desc: "CPU, RAM, SSD, GPU and custom build parts.",
      icon: <BiChip size={28} />,
      to: "/products?category=Components",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#F1F0E9] overflow-x-hidden">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 lg:pt-14 pb-12">
        <div className="rounded-[36px] bg-white border border-black/10 shadow-sm p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Left */}
            <div>
              <p className="text-black/60 font-black uppercase tracking-wider text-sm">
                Isuri Computers
              </p>

              <h1 className="text-4xl lg:text-5xl font-black text-black mt-3 leading-tight">
                Upgrade your setup with
                <span className="block text-[#48A111]">trusted tech</span>
              </h1>

              <p className="text-black/60 mt-5 leading-8 max-w-xl">
                Browse laptops, desktops, components and accessories with fair pricing and
                reliable support.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/products" className={btnPrimary}>
                  Shop Products
                </Link>
                <Link to="/contact" className={btnSecondary}>
                  Contact
                </Link>
                <Link to="/about" className={btnOutline}>
                  Learn More
                </Link>
              </div>

              <div className="mt-8 grid sm:grid-cols-3 gap-4">
                <MiniFeature
                  icon={<BiShieldQuarter size={24} />}
                  title="Genuine items"
                  desc="Quality-first products you can trust."
                />
                <MiniFeature
                  icon={<BiPackage size={24} />}
                  title="Fast handling"
                  desc="Quick processing and clear updates."
                />
                <MiniFeature
                  icon={<BiSupport size={24} />}
                  title="Support"
                  desc="Help choosing the right device/parts."
                />
              </div>
            </div>

            {/* Right */}
            <div className="rounded-3xl bg-[#F1F0E9] border border-black/10 p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-3xl bg-white border border-black/10 p-5">
                  <p className="text-black/60 text-sm font-semibold">Products</p>
                  <p className="text-3xl font-black text-black mt-2">
                    {loading ? "..." : products.length}
                  </p>
                </div>

                <div className="rounded-3xl bg-white border border-black/10 p-5">
                  <p className="text-black/60 text-sm font-semibold">Deals</p>
                  <p className="text-3xl font-black text-black mt-2">
                    {loading ? "..." : dealProducts.length}
                  </p>
                </div>

                {/* Best product slideshow */}
                <BestProductSlideshow products={bestProducts} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <div className="flex items-end justify-between gap-6 mb-6">
          <div>
            <h2 className="text-3xl font-black text-black">Shop by Category</h2>
            <p className="text-black/60 mt-2">Simple browsing with clear categories.</p>
          </div>
          <Link
            to="/products"
            className="hidden sm:inline-flex text-black font-black hover:underline"
          >
            View all →
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((c) => (
            <CategoryCard
              key={c.title}
              icon={c.icon}
              title={c.title}
              desc={c.desc}
              to={c.to}
            />
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <ProductRail
          title="Featured Products"
          subtitle="Popular picks from the store."
          products={featuredProducts}
        />
      </section>

      {/* DEALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <ProductRail
          title="Best Deals"
          subtitle="Discounted items worth checking."
          products={dealProducts}
        />
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-[36px] bg-black text-[#F1F0E9] border border-black/10 p-8 lg:p-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl font-black">Ready to upgrade?</h2>
              <p className="text-[#F1F0E9]/70 mt-2 leading-7">
                Browse all products and pick what fits your needs.
              </p>
            </div>

            <Link
              to="/products"
              className="h-[52px] px-8 rounded-2xl bg-[#48A111] text-black font-black flex items-center justify-center hover:bg-[#3D8F0F] transition"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}