import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import getFormattedPrice from "../../utils/price-format";
import axios from "axios";
import { CiEdit } from "react-icons/ci";
import LoadingAnimation from "../../components/loadingAnimation";
import DeleteModal from "../../components/DeleteModal.jsx";

export default function AdminProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading) {
            const token = localStorage.getItem("token");

            axios
                .get(import.meta.env.VITE_API_URL + "/products", {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                })
                .then((response) => {
                    setProducts(response.data);
                    setLoading(false);
                });
        }
    }, [loading]);

    return (
        <div className="w-full h-full overflow-y-auto hide-scroll-track bg-accent rounded-2xl">
            <div className="flex items-center justify-between gap-3 px-5 py-4 bg-primary text-accent border-b border-primary/10 sticky top-0 z-20">
                <div>
                    <h2 className="text-lg font-semibold">Products</h2>
                    <p className="text-sm text-accent/70">Manage your catalog at a glance</p>
                </div>

                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-accent">
                    <span className="h-2 w-2 rounded-full bg-secondary" />
                    {products?.length ?? 0} items
                </span>
            </div>

            {loading ? (
                <div className="w-full h-[500px] flex justify-center items-center">
                    <LoadingAnimation />
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-[1100px] w-full text-sm">
                        <thead className="sticky top-[72px] z-10 bg-white">
                            <tr className="border-b border-primary/10">
                                <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-primary/70">
                                    Product ID
                                </th>
                                <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-primary/70">
                                    Name
                                </th>
                                <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-primary/70">
                                    Price
                                </th>
                                <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-primary/70">
                                    Labelled
                                </th>
                                <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-primary/70">
                                    Category
                                </th>
                                <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-primary/70">
                                    Image
                                </th>
                                <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-primary/70">
                                    Visibility
                                </th>
                                <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-primary/70">
                                    Brand
                                </th>
                                <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-primary/70">
                                    Model
                                </th>
                                <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-primary/70">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-primary/10">
                            {products.map((item) => (
                                <tr
                                    key={item.productId}
                                    className="hover:bg-white/70 transition"
                                >
                                    <td className="px-5 py-4 font-medium text-primary whitespace-nowrap">
                                        {item.productId}
                                    </td>

                                    <td className="px-5 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-primary">
                                                {item.name}
                                            </span>
                                            <span className="text-xs text-primary/60">
                                                {item.category || "Uncategorized"}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="px-5 py-4 font-semibold text-secondary whitespace-nowrap">
                                        {getFormattedPrice(item.price)}
                                    </td>

                                    <td className="px-5 py-4 text-primary/80 whitespace-nowrap">
                                        {item.labelledPrice ? (
                                            <span>{getFormattedPrice(item.labelledPrice)}</span>
                                        ) : (
                                            <span className="text-primary/40">—</span>
                                        )}
                                    </td>

                                    <td className="px-5 py-4">
                                        <span className="flex items-center justify-center rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary">
                                            {item.category}
                                        </span>
                                    </td>

                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3 justify-center">
                                            <img
                                                src={item.images?.[0]}
                                                alt={item.name}
                                                className="h-12 w-12 rounded-xl object-cover ring-1 ring-primary/10 shadow-sm bg-white"
                                                loading="lazy"
                                            />
                                        </div>
                                    </td>

                                    <td className="px-5 py-4">
                                        {item.isVisible ? (
                                            <span className="flex items-center justify-center gap-2 rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
                                                <span className="h-2 w-2 rounded-full bg-secondary" />
                                                Visible
                                            </span>
                                        ) : (
                                            <span className="flex items-center justify-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary/70">
                                                <span className="h-2 w-2 rounded-full bg-primary/40" />
                                                Hidden
                                            </span>
                                        )}
                                    </td>

                                    <td className="px-5 py-4 text-primary whitespace-nowrap">
                                        {item.brand || <span className="text-primary/40">N/A</span>}
                                    </td>

                                    <td className="px-5 py-4 text-primary whitespace-nowrap">
                                        {item.model || <span className="text-primary/40">N/A</span>}
                                    </td>

                                    <td className="px-5 py-4">
                                        <div className="flex justify-center items-center text-2xl gap-2 text-primary">
                                            <Link
                                                to="/admin/update-product"
                                                state={item}
                                                className="hover:text-secondary transition"
                                            >
                                                <CiEdit />
                                            </Link>

                                            <DeleteModal product={item} setLoading={setLoading} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="px-5 py-3 bg-white border-t border-primary/10 text-xs text-primary/60">
                Tip: Scroll horizontally on small screens to view all columns.
            </div>

            <Link
                to="/admin/add-product"
                className="text-white bg-secondary w-[56px] h-[56px] flex justify-center items-center text-2xl rounded-2xl hover:rounded-full transition-all fixed bottom-12 right-16 shadow-xl"
            >
                <FaPlus />
            </Link>
        </div>
    );
}