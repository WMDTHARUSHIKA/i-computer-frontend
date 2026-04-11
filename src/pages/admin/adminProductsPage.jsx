import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import getFormattedPrice from "../../utils/price-format";
import axios from "axios";
import { CiEdit } from "react-icons/ci";
import LoadingAnimation from "../../components/loadingAnimation";
import DeleteModal from "../../components/DeleteModal.jsx";
import toast from "react-hot-toast";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoading(true);

    axios
      .get(import.meta.env.VITE_API_URL + "/products", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => setProducts(res.data || []))
      .catch(() => toast.error("Failed to load products"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-full h-full bg-accent rounded-2xl overflow-hidden flex flex-col">
      {/* ✅ Removed the top header section completely */}

      <div className="flex-1 min-h-0 p-4">
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <LoadingAnimation />
          </div>
        ) : (
          <div className="w-full h-full bg-white rounded-2xl shadow-md border border-primary/10 overflow-hidden">
            {/* scroll both horizontally + vertically */}
            <div className="w-full h-full overflow-auto">
              <table className="min-w-[1100px] w-full text-sm">
                {/* ✅ Clear header row */}
                <thead className="sticky top-0 z-20 bg-white">
                  <tr className="border-b border-primary/15">
                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-primary/70 w-[120px]">
                      Product ID
                    </th>
                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-primary/70 w-[320px]">
                      Name
                    </th>
                    <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-primary/70 w-[140px]">
                      Price
                    </th>
                    <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-primary/70 w-[140px]">
                      Labelled
                    </th>
                    <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wider text-primary/70 w-[160px]">
                      Category
                    </th>
                    <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wider text-primary/70 w-[110px]">
                      Image
                    </th>
                    <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wider text-primary/70 w-[150px]">
                      Visibility
                    </th>
                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-primary/70 w-[140px]">
                      Brand
                    </th>
                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-primary/70 w-[140px]">
                      Model
                    </th>

                    {/* ✅ Last column fixed width + centered */}
                    <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wider text-primary/70 w-[140px]">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-primary/10">
                  {products.map((item, idx) => (
                    <tr
                      key={item.productId}
                      className={idx % 2 === 0 ? "bg-white" : "bg-primary/[0.02]"}
                    >
                      <td className="px-5 py-5 font-semibold text-primary whitespace-nowrap">
                        {item.productId}
                      </td>

                      <td className="px-5 py-5">
                        <div className="flex flex-col">
                          <span className="font-semibold text-primary">{item.name}</span>
                          <span className="text-xs text-primary/60">
                            {item.category || "Uncategorized"}
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-5 text-right font-bold text-secondary whitespace-nowrap">
                        {getFormattedPrice(item.price)}
                      </td>

                      <td className="px-5 py-5 text-right text-primary/80 whitespace-nowrap">
                        {item.labelledPrice ? (
                          getFormattedPrice(item.labelledPrice)
                        ) : (
                          <span className="text-primary/40">—</span>
                        )}
                      </td>

                      <td className="px-5 py-5 text-center">
                        <span className="inline-flex items-center justify-center rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
                          {item.category || "Others"}
                        </span>
                      </td>

                      <td className="px-5 py-5">
                        <div className="flex justify-center">
                          <img
                            src={item.images?.[0]}
                            alt={item.name}
                            className="h-12 w-12 rounded-xl object-cover ring-1 ring-primary/10 shadow-sm bg-white"
                            loading="lazy"
                          />
                        </div>
                      </td>

                      <td className="px-5 py-5 text-center">
                        {item.isVisible ? (
                          <span className="inline-flex items-center justify-center gap-2 rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
                            <span className="h-2 w-2 rounded-full bg-secondary" />
                            Visible
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary/70">
                            <span className="h-2 w-2 rounded-full bg-primary/40" />
                            Hidden
                          </span>
                        )}
                      </td>

                      <td className="px-5 py-5 text-primary whitespace-nowrap">
                        {item.brand || <span className="text-primary/40">N/A</span>}
                      </td>

                      <td className="px-5 py-5 text-primary whitespace-nowrap">
                        {item.model || <span className="text-primary/40">N/A</span>}
                      </td>

                      {/* ✅ Clean actions cell */}
                      <td className="px-5 py-5">
                        <div className="flex justify-center items-center gap-3 whitespace-nowrap">
                          <Link
                            to="/admin/update-product"
                            state={item}
                            className="inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-primary/5 text-primary hover:text-secondary transition"
                            title="Edit"
                          >
                            <CiEdit size={22} />
                          </Link>

                          <DeleteModal product={item} onDeleted={(id) => {setProducts((prev) => prev.filter((p) => p.productId !== id));}}/>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {products.length === 0 && (
                    <tr>
                      <td colSpan={10} className="px-5 py-16 text-center text-primary/60">
                        No products found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Add product button */}
      <Link
        to="/admin/add-product"
        className="text-white bg-secondary w-[56px] h-[56px] flex justify-center items-center text-2xl rounded-2xl hover:rounded-full transition-all fixed bottom-12 right-16 shadow-xl"
      >
        <FaPlus />
      </Link>
    </div>
  );
}