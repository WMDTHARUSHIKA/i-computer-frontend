import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import getFormattedDate from "../utils/date-format";
import getFormattedPrice from "../utils/price-format";
import LoadingAnimation from "../components/loadingAnimation";
import CustomerViewOrderInfoModal from "../components/CustomersViewOrderInfoModal";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
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
  }, [pageNumber, pageSize]);

  return (
    <div className="w-full min-h-[calc(100vh-100px)] bg-accent overflow-y-auto hide-scroll-track relative">
      <div className="max-w-6xl mx-auto p-4 lg:p-8 pb-28">
        <div className="mb-6">
          <h1 className="text-3xl font-black text-primary">My Orders</h1>
          <p className="text-primary/70 mt-2">Track and review your previous purchases.</p>
        </div>

        {loading ? (
          <div className="w-full h-[400px] flex justify-center items-center">
            <LoadingAnimation />
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-3xl shadow-md border border-primary/10">
            <table className="min-w-[1100px] w-full text-sm">
              <thead className="sticky top-0 z-10 bg-white">
                <tr className="border-b border-primary/10">
                  <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-primary/70">
                    Order ID
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-primary/70">
                    Customer Name
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-primary/70">
                    Email
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-primary/70">
                    Date
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-primary/70">
                    Total Amount
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-primary/70">
                    Status
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-primary/70">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order.orderId} className="border-b border-primary/10">
                    <td className="px-5 py-4 text-center text-primary">{order.orderId}</td>
                    <td className="px-5 py-4 text-center text-primary">
                      {order.firstName} {order.lastName}
                    </td>
                    <td className="px-5 py-4 text-center text-primary/80">{order.email}</td>
                    <td className="px-5 py-4 text-center text-primary/80">
                      {getFormattedDate(order.date)}
                    </td>
                    <td className="px-5 py-4 text-center text-secondary font-semibold">
                      {getFormattedPrice(order.total)}
                    </td>
                    <td className="px-5 py-4 text-center">
                      <span className="inline-flex items-center rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
                        {order.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <CustomerViewOrderInfoModal order={order} />
                    </td>
                  </tr>
                ))}

                {!orders.length && (
                  <tr>
                    <td colSpan={7} className="px-5 py-10 text-center text-primary/70">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="w-full sticky bottom-4 left-0 h-[60px] flex justify-center items-center px-4">
        <div className="w-full max-w-[560px] h-full bg-white shadow-xl rounded-full flex items-center justify-center px-3 gap-3 border border-primary/10">
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
    </div>
  );
}