import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductCard from "../components/ProductCard";
import LoadingAnimation from "../components/loadingAnimation";

export default function ProductPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (loading) {
            let url = import.meta.env.VITE_API_URL + "/products/";
            if (searchQuery !== "") {
                url = import.meta.env.VITE_API_URL + "/products/search/" + searchQuery;
            }

            axios
                .get(url)
                .then((response) => {
                    setProducts(response.data);
                    setLoading(false);
                })
                .catch(() => {
                    toast.error("Failed to fetch products. Please try again.");
                    setLoading(false);
                });
        }
    }, [loading, searchQuery]);

    return (
        <div className="min-h-[calc(100vh-100px)] bg-accent relative pt-[90px]">
            <div className="w-full h-[72px] backdrop-blur-sm bg-accent/80 sticky top-[100px] z-30 flex justify-center items-center px-4">
                <div className="w-full max-w-3xl flex flex-col sm:flex-row gap-3 items-center">
                    <input
                        type="text"
                        placeholder="Search for products..."
                        className="w-full h-[48px] rounded-full px-5 bg-white border border-primary/10 outline-none focus:ring-2 focus:ring-secondary"
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setLoading(true);
                        }}
                    />
                    <button
                        className="px-5 py-3 rounded-full bg-secondary text-white font-semibold hover:opacity-90 transition whitespace-nowrap"
                        onClick={() => {
                            setSearchQuery("");
                            setLoading(true);
                        }}
                    >
                        Get all products
                    </button>
                </div>
            </div>

            <div className="flex justify-center flex-wrap max-w-7xl mx-auto px-4 py-8">
                {loading ? (
                    <LoadingAnimation />
                ) : (
                    products.map((item) => (
                        <ProductCard product={item} key={item.productId} />
                    ))
                )}
            </div>
        </div>
    );
}