import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import LoadingAnimation from "../../components/loadingAnimation";
import getFormattedPrice from "../../utils/price-format";
import getFormattedDate from "../../utils/date-format";
import toast from "react-hot-toast";
import ViewOrderInfoModal from "../../components/ViewOrderInfoModal";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  // edit modal state
  const [editOpen, setEditOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [editStatus, setEditStatus] = useState("Pending");
  const [editNotes, setEditNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const token = useMemo(() => localStorage.getItem("token"), []);

  useEffect(() => {
    setLoading(true);

    axios
      .get(`${import.meta.env.VITE_API_URL}/orders/${pageSize}/${pageNumber}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setOrders(res.data.orders || []);
        setTotalPages(res.data.totalPages || 0);
      })
      .catch(() => toast.error("Failed to load orders"))
      .finally(() => setLoading(false));
  }, [pageNumber, pageSize, token]);

  const getStatusClasses = (status) => {
    const s = String(status || "").toLowerCase();
    if (s.includes("delivered") || s.includes("complete") || s.includes("paid")) {
      return "bg-green-100 text-green-700 border-green-200";
    }
    if (s.includes("cancel") || s.includes("failed")) {
      return "bg-red-100 text-red-700 border-red-200";
    }
    if (s.includes("ship")) {
      return "bg-blue-100 text-blue-700 border-blue-200";
    }
    return "bg-yellow-100 text-yellow-800 border-yellow-200";
  };

  const openEdit = (order) => {
    setEditingOrder(order);
    setEditStatus(order?.status || "Pending");
    setEditNotes(order?.notes || "");
    setEditOpen(true);
  };

  const saveEdit = async () => {
    if (!editingOrder) return;

    setSaving(true);
    try {
      // backend: orderRouter.patch("/:orderId", updateOrderStatusAndNotes)
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/orders/${editingOrder.orderId}`,
        { status: editStatus, notes: editNotes },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updated = res.data?.order;

      toast.success("Order updated");

      // update row immediately
      if (updated) {
        setOrders((prev) =>
          prev.map((o) => (o.orderId === updated.orderId ? updated : o))
        );
      } else {
        // if backend doesn't return updated order, reload
        setLoading(true);
      }

      setEditOpen(false);
      setEditingOrder(null);
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to update order");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full h-full bg-accent rounded-2xl overflow-hidden flex flex-col">
      {/* Header */}
      <div className="px-6 py-5 bg-primary text-accent border-b border-primary/10">
        <h2 className="text-xl font-bold">Orders</h2>
        <p className="text-sm text-accent/70">Manage your orders at a glance</p>
      </div>

      {/* Table area */}
      <div className="flex-1 min-h-0">
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <LoadingAnimation />
          </div>
        ) : (
          <div className="h-full p-4">
            <div className="h-full bg-white rounded-2xl shadow-md border border-primary/10 overflow-hidden">
              <div className="h-full overflow-auto">
                <table className="min-w-[1200px] w-full text-sm border-separate border-spacing-0">
                  <thead className="sticky top-0 z-20 bg-primary/5 backdrop-blur">
                    <tr>
                      <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-primary/70 border-b border-primary/10 w-[140px]">
                        Order ID
                      </th>
                      <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-primary/70 border-b border-primary/10 w-[190px]">
                        Customer
                      </th>
                      <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-primary/70 border-b border-primary/10 w-[280px]">
                        Email
                      </th>
                      <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-primary/70 border-b border-primary/10 w-[220px]">
                        Date
                      </th>
                      <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-primary/70 border-b border-primary/10 w-[160px]">
                        Total
                      </th>
                      <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wider text-primary/70 border-b border-primary/10 w-[150px]">
                        Status
                      </th>
                      <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-primary/70 border-b border-primary/10 w-[260px]">
                        Notes
                      </th>
                      <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wider text-primary/70 border-b border-primary/10 w-[220px]">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {orders.map((order, idx) => (
                      <tr
                        key={order.orderId}
                        className={`border-b border-primary/10 ${
                          idx % 2 === 0 ? "bg-white" : "bg-primary/[0.02]"
                        } hover:bg-primary/[0.04] transition`}
                      >
                        <td className="px-5 py-5 text-primary font-semibold whitespace-nowrap">
                          {order.orderId}
                        </td>

                        <td className="px-5 py-5 text-primary whitespace-nowrap">
                          {order.firstName} {order.lastName}
                        </td>

                        <td
                          className="px-5 py-5 text-primary/80 max-w-[280px] truncate"
                          title={order.email}
                        >
                          {order.email}
                        </td>

                        <td
                          className="px-5 py-5 text-primary/80 max-w-[220px] truncate"
                          title={getFormattedDate(order.date)}
                        >
                          {getFormattedDate(order.date)}
                        </td>

                        <td className="px-5 py-5 text-right font-bold text-secondary whitespace-nowrap">
                          {getFormattedPrice(order.total)}
                        </td>

                        <td className="px-5 py-5 text-center">
                          <span
                            className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-bold border ${getStatusClasses(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>
                        </td>

                        <td
                          className="px-5 py-5 text-primary/70 max-w-[260px] truncate"
                          title={order.notes || ""}
                        >
                          {order.notes ? order.notes : "—"}
                        </td>

                        <td className="px-5 py-5 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <ViewOrderInfoModal order={order} />
                            <button
                              className="px-4 py-2 rounded-full bg-primary text-accent font-semibold hover:opacity-90 transition"
                              onClick={() => openEdit(order)}
                            >
                              Edit
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {orders.length === 0 && (
                      <tr>
                        <td colSpan={8} className="px-5 py-16 text-center text-primary/60">
                          No orders found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="px-4 pb-4">
        <div className="w-full max-w-[560px] mx-auto h-[60px] bg-white shadow-xl rounded-full flex items-center justify-center px-3 gap-3 border border-primary/10">
          <button
            className="bg-secondary w-[110px] text-white p-2 rounded-full cursor-pointer hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={pageNumber <= 1}
            onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
          >
            Previous
          </button>

          <span className="text-sm text-primary w-[130px] text-center font-medium">
            Page {pageNumber} of {totalPages}
          </span>

          <button
            className="bg-secondary text-white p-2 rounded-full w-[110px] cursor-pointer hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={pageNumber >= totalPages}
            onClick={() => setPageNumber((p) => p + 1)}
          >
            Next
          </button>

          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(parseInt(e.target.value, 10));
              setPageNumber(1);
            }}
            className="border border-primary/20 rounded-full px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-secondary"
          >
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
            <option value={50}>50 per page</option>
          </select>
        </div>
      </div>

      {/* Edit Modal */}
      {editOpen && editingOrder && (
        <div className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-primary/10 flex items-center justify-between">
              <div>
                <div className="text-primary font-bold text-lg">
                  Edit Order: {editingOrder.orderId}
                </div>
                <div className="text-primary/70 text-sm">
                  {editingOrder.firstName} {editingOrder.lastName} • {editingOrder.email}
                </div>
              </div>
              <button
                className="text-primary/60 hover:text-primary"
                onClick={() => {
                  if (!saving) {
                    setEditOpen(false);
                    setEditingOrder(null);
                  }
                }}
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
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
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
                  Notes
                </label>
                <textarea
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  rows={4}
                  className="w-full border border-primary/20 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-secondary"
                  placeholder="Add admin notes..."
                  disabled={saving}
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  className="px-5 py-2 rounded-full border border-primary/20 text-primary hover:bg-gray-50 transition"
                  onClick={() => {
                    if (!saving) {
                      setEditOpen(false);
                      setEditingOrder(null);
                    }
                  }}
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  className="px-6 py-2 rounded-full bg-secondary text-white font-semibold hover:opacity-90 transition disabled:opacity-50"
                  onClick={saveEdit}
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}