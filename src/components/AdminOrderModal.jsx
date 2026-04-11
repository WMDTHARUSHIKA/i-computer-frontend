import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminOrderModal({ order, onUpdated, onOpenChange }) {
  const [status, setStatus] = useState(order?.status || "Pending");
  const [notes, setNotes] = useState(order?.notes || "");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setStatus(order?.status || "Pending");
    setNotes(order?.notes || "");
  }, [order]);

  const save = async () => {
    const token = localStorage.getItem("token");
    setSaving(true);

    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/orders/${order.orderId}`,
        { status, notes },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Order updated");
      onUpdated?.(res.data.order);
      onOpenChange(false);
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to update order");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-primary/10 flex items-center justify-between">
          <div>
            <div className="text-primary font-bold text-lg">{order.orderId}</div>
            <div className="text-primary/70 text-sm">
              {order.firstName} {order.lastName} • {order.email}
            </div>
          </div>
          <button
            className="text-primary/60 hover:text-primary"
            onClick={() => onOpenChange(false)}
            disabled={saving}
          >
            Close
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-primary mb-2">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-primary/20 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-secondary"
              disabled={saving}
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary mb-2">
              Admin Note
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Add internal note (visible to admin)..."
              className="w-full border border-primary/20 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-secondary"
              disabled={saving}
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              className="px-5 py-2 rounded-full border border-primary/20 text-primary hover:bg-gray-50 transition"
              onClick={() => onOpenChange(false)}
              disabled={saving}
            >
              Cancel
            </button>
            <button
              className="px-6 py-2 rounded-full bg-secondary text-white font-semibold hover:opacity-90 transition disabled:opacity-50"
              onClick={save}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}