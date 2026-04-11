import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import ProductCard from "../components/ProductCard";
import LoadingAnimation from "../components/loadingAnimation";

// Common computer shop categories (you can edit this list)
const DEFAULT_CATEGORIES = [
  "All",
  "Laptops",
  "Desktops",
  "Monitors",
  "Printers",
  "Networking",
  "Storage (HDD/SSD)",
  "RAM",
  "Processors (CPU)",
  "Graphics Cards (GPU)",
  "Motherboards",
  "Power Supplies",
  "Cases",
  "Cooling",
  "Keyboards",
  "Mouse",
  "Headsets",
  "Speakers",
  "Accessories",
];

const PRICE_RANGES = [
  { value: "all", label: "All prices", min: null, max: null },
  { value: "0-5000", label: "0 - 5,000", min: 0, max: 5000 },
  { value: "5000-10000", label: "5,000 - 10,000", min: 5000, max: 10000 },
  { value: "10000-25000", label: "10,000 - 25,000", min: 10000, max: 25000 },
  { value: "25000-50000", label: "25,000 - 50,000", min: 25000, max: 50000 },
  { value: "50000-100000", label: "50,000 - 100,000", min: 50000, max: 100000 },
  { value: "100000+", label: "100,000+", min: 100000, max: null },
];

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");

  // filters
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");

  // ---------- fetch products (search only) ----------
  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      try {
        let url = `${import.meta.env.VITE_API_URL}/products/`;
        if (searchQuery.trim() !== "") {
          url = `${import.meta.env.VITE_API_URL}/products/search/${encodeURIComponent(
            searchQuery.trim()
          )}`;
        }

        const res = await axios.get(url);
        if (!cancelled) setProducts(res.data || []);
      } catch {
        if (!cancelled) toast.error("Failed to fetch products. Please try again.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    const t = setTimeout(load, 300);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [searchQuery]);

  // ---------- helpers (adjust field names if needed) ----------
  const getPrice = (p) => Number(p?.price ?? p?.unitPrice ?? p?.currentPrice ?? 0);

  const getCategory = (p) => {
    // try common field names
    const c =
      p?.category ??
      p?.type ??
      p?.productType ??
      p?.productCategory ??
      p?.categoryName;

    if (!c) return "";
    return String(c).trim();
  };

  // Optional: build category options from actual products + your defaults
  const categoryOptions = useMemo(() => {
    const set = new Set(DEFAULT_CATEGORIES);

    for (const p of products) {
      const c = getCategory(p);
      if (c) set.add(c);
    }

    // Ensure "All" is first, then sort others
    const arr = Array.from(set).filter(Boolean);
    const allIndex = arr.indexOf("All");
    if (allIndex !== -1) arr.splice(allIndex, 1);

    arr.sort((a, b) => a.localeCompare(b));
    return ["All", ...arr];
  }, [products]);

  // ---------- apply filters locally ----------
  const filteredProducts = useMemo(() => {
    const range =
      PRICE_RANGES.find((r) => r.value === selectedPriceRange) || PRICE_RANGES[0];

    return products.filter((p) => {
      const price = getPrice(p);
      const category = getCategory(p);

      const okCategory =
        selectedCategory === "All"
          ? true
          : category.toLowerCase() === selectedCategory.toLowerCase();

      const okMin = range.min == null ? true : price >= range.min;
      const okMax = range.max == null ? true : price <= range.max;

      return okCategory && okMin && okMax;
    });
  }, [products, selectedCategory, selectedPriceRange]);

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedPriceRange("all");
  };

  return (
    <div className="min-h-[calc(100vh-100px)] bg-accent relative pt-[90px]">
      {/* Search + Filters */}
      <div className="w-full backdrop-blur-sm bg-accent/80 sticky top-[90px] z-30 px-4 py-4">
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-3">
          {/* Search row */}
          <div className="w-full flex flex-col sm:flex-row gap-3 items-center">
            <input
              type="text"
              value={searchQuery}
              placeholder="Search for products..."
              className="w-full h-[48px] rounded-full px-5 bg-white border border-primary/10 outline-none focus:ring-2 focus:ring-secondary"
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <button
              className="px-5 py-3 rounded-full bg-secondary text-white font-semibold hover:opacity-90 transition whitespace-nowrap"
              onClick={() => setSearchQuery("")}
            >
              Get all products
            </button>
          </div>

          {/* Filters row */}
          <div className="w-full flex flex-col lg:flex-row gap-3 items-center">
            {/* Category filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full lg:w-[300px] h-[44px] rounded-full px-4 bg-white border border-primary/10 outline-none focus:ring-2 focus:ring-secondary"
            >
              {categoryOptions.map((c) => (
                <option key={c} value={c}>
                  {c === "All" ? "All categories" : c}
                </option>
              ))}
            </select>

            {/* Price range filter */}
            <select
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
              className="w-full lg:w-[260px] h-[44px] rounded-full px-4 bg-white border border-primary/10 outline-none focus:ring-2 focus:ring-secondary"
            >
              {PRICE_RANGES.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>

            <button
              className="w-full lg:w-auto px-5 py-3 rounded-full bg-white border border-primary/10 text-primary font-semibold hover:bg-gray-50 transition whitespace-nowrap"
              onClick={clearFilters}
            >
              Clear filters
            </button>
          </div>

          {!loading && (
            <div className="text-primary/70 text-sm px-2">
              Showing {filteredProducts.length} product(s)
            </div>
          )}
        </div>
      </div>

      {/* Products */}
      <div className="flex justify-center flex-wrap max-w-7xl mx-auto px-4 py-8 gap-4">
        {loading ? (
          <LoadingAnimation />
        ) : filteredProducts.length === 0 ? (
          <div className="text-primary/70 py-10">No products match your filters.</div>
        ) : (
          filteredProducts.map((item) => (
            <ProductCard product={item} key={item.productId} />
          ))
        )}
      </div>
    </div>
  );
}