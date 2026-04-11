import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import LoadingAnimation from "../components/loadingAnimation";
import ImageSlideShow from "../components/imageSlideShow";
import getFormattedPrice from "../utils/price-format";
import { addToCart } from "../utils/cart";

export default function Overview() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/products/" + params.productId)
      .then((response) => {
        setProduct(response.data);
        setQty(1); // reset qty when product changes
      })
      .catch(() => toast.error("Failed to load product"));
  }, [params.productId]);

  const safeQty = useMemo(() => {
    const n = Number(qty);
    if (Number.isNaN(n) || n < 1) return 1;
    if (n > 99) return 99;
    return Math.floor(n);
  }, [qty]);

  function handleAddToCart() {
    if (!product) return;
    addToCart(product, safeQty);
    toast.success(`${product.name} (x${safeQty}) added to cart`);
  }

  if (product == null) {
    return (
      <div className="w-full min-h-[calc(100vh-100px)] bg-accent flex justify-center items-center">
        <LoadingAnimation />
      </div>
    );
  }

  const checkoutItem = [
    {
      product: {
        name: product.name,
        price: product.price,
        labelledPrice: product.labelledPrice,
        image: product.images?.[0] || "",
        images: product.images || [],
        productId: product.productId,
        brand: product.brand || "",
        model: product.model || "",
      },
      qty: safeQty, // ✅ use selected quantity
    },
  ];

  return (
    <div className="w-full min-h-[calc(100vh-100px)] bg-accent flex justify-center items-center p-4 lg:p-8">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row bg-white rounded-3xl shadow-xl border border-primary/10 overflow-hidden">
        <div className="w-full lg:w-[50%] p-4 lg:p-8 flex justify-center items-center bg-accent">
          <ImageSlideShow images={product.images || []} />
        </div>

        <div className="lg:w-[50%] p-6 lg:p-10 flex justify-center flex-col">
          <h1 className="text-3xl font-black text-primary mb-3">{product.name}</h1>

          <div className="flex flex-wrap gap-2 mb-4">
            {product.altNames?.map((altName, index) => (
              <span
                key={index}
                className="text-sm bg-secondary/10 text-secondary px-3 py-1 rounded-full font-medium"
              >
                {altName}
              </span>
            ))}
          </div>

          {(product.brand || product.model) && (
            <p className="text-lg font-medium mb-2 text-primary/80">
              <span>{product.brand || ""}</span>
              {product.brand && product.model ? <span> - </span> : null}
              <span>{product.model || ""}</span>
            </p>
          )}

          <p className="text-sm text-primary/50 mb-4">{product.productId}</p>

          <p className="text-3xl font-black text-secondary mb-2">
            {getFormattedPrice(product.price)}
          </p>

          {product.labelledPrice > product.price && (
            <p className="text-lg text-primary/40 line-through mb-4">
              {getFormattedPrice(product.labelledPrice)}
            </p>
          )}

          <p className="text-base text-primary/80 leading-7 mb-6">
            {product.description}
          </p>

          {/* ✅ Quantity selector */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-primary mb-2">Quantity</p>

            <div className="inline-flex items-center rounded-2xl border border-primary/10 bg-white overflow-hidden">
              <button
                type="button"
                className="w-12 h-12 flex items-center justify-center text-xl text-primary hover:bg-primary/5 transition disabled:opacity-40"
                disabled={safeQty <= 1}
                onClick={() => setQty((q) => Math.max(1, Number(q) - 1))}
              >
                -
              </button>

              <input
                type="number"
                min={1}
                max={99}
                value={safeQty}
                onChange={(e) => setQty(e.target.value)}
                className="w-16 h-12 text-center outline-none border-x border-primary/10"
              />

              <button
                type="button"
                className="w-12 h-12 flex items-center justify-center text-xl text-primary hover:bg-primary/5 transition disabled:opacity-40"
                disabled={safeQty >= 99}
                onClick={() => setQty((q) => Math.min(99, Number(q) + 1))}
              >
                +
              </button>
            </div>
          </div>

          <div className="w-full flex flex-wrap gap-4 text-white font-bold text-lg">
            <button
              className="px-6 py-3 bg-secondary rounded-2xl hover:opacity-90 cursor-pointer transition"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>

            <Link
              to="/checkout"
              state={checkoutItem}
              className="px-6 py-3 bg-primary rounded-2xl hover:opacity-90 cursor-pointer transition"
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}