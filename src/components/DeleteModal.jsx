import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function DeleteModal({ product, onDeleted }) {
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const doDelete = async () => {
    const token = localStorage.getItem("token");
    setDeleting(true);

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/products/${product.productId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Product deleted");
      onDeleted?.(product.productId);
      setOpen(false);
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to delete product");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      {/* small delete icon button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-red-50 text-red-600 transition"
        title="Delete"
      >
        <RiDeleteBin6Line size={20} />
      </button>

      {open && (
        <div className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-5 border-b border-primary/10">
              <h3 className="text-lg font-bold text-primary">Delete product?</h3>
              <p className="text-sm text-primary/70 mt-1">
                This will permanently delete <b>{product.name}</b>.
              </p>
            </div>

            <div className="p-5 flex justify-end gap-3">
              <button
                className="px-5 py-2 rounded-full border border-primary/20 text-primary hover:bg-gray-50 transition"
                onClick={() => setOpen(false)}
                disabled={deleting}
              >
                Cancel
              </button>

              <button
                className="px-5 py-2 rounded-full bg-red-600 text-white font-semibold hover:opacity-90 transition disabled:opacity-50"
                onClick={doDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}