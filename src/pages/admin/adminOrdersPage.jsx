import axios from "axios";
import { useEffect, useState } from "react";
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

    useEffect(() => {
        if (loading) {
            const token = localStorage.getItem("token");

            axios
                .get(
                    import.meta.env.VITE_API_URL + "/orders/" + pageSize + "/" + pageNumber,
                    {
                        headers: {
                            Authorization: "Bearer " + token,
                        },
                    }
                )
                .then((response) => {
                    setOrders(response.data.orders);
                    setTotalPages(response.data.totalPages);
                    setLoading(false);
                })
                .catch(() => {
                    toast.error("Failed to load orders");
                    setLoading(false);
                });
        }
    }, [loading, pageNumber, pageSize]);

    return (
        <div className="w-full h-full overflow-y-auto hide-scroll-track relative bg-accent rounded-2xl">
            <div className="flex items-center justify-between gap-3 px-5 py-4 bg-primary text-accent border-b border-primary/10 sticky top-0 z-20">
                <div>
                    <h2 className="text-lg font-semibold">Orders</h2>
                    <p className="text-sm text-accent/70">Manage your orders at a glance</p>
                </div>
            </div>

            {loading ? (
                <div className="w-full h-[500px] flex justify-center items-center">
                    <LoadingAnimation />
                </div>
            ) : (
                <div className="overflow-x-auto pb-24">
                    <table className="min-w-[1100px] w-full text-sm">
                        <thead className="sticky top-[72px] z-10 bg-white">
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

                        <tbody className="divide-y divide-primary/10">
                            {orders.map((order) => (
                                <tr key={order.orderId} className="hover:bg-white/70 transition">
                                    <td className="px-5 py-4 text-center text-primary font-medium">
                                        {order.orderId}
                                    </td>
                                    <td className="px-5 py-4 text-center text-primary">
                                        {order.firstName + " " + order.lastName}
                                    </td>
                                    <td className="px-5 py-4 text-center text-primary/80">
                                        {order.email}
                                    </td>
                                    <td className="px-5 py-4 text-center text-primary/80">
                                        {getFormattedDate(order.date)}
                                    </td>
                                    <td className="px-5 py-4 text-center font-semibold text-secondary">
                                        {getFormattedPrice(order.total)}
                                    </td>
                                    <td className="px-5 py-4 text-center">
                                        <span className="inline-flex items-center rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 text-center">
                                        <ViewOrderInfoModal order={order} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="w-full sticky bottom-4 left-0 h-[60px] flex justify-center items-center px-4">
                <div className="w-full max-w-[560px] h-full bg-white shadow-xl rounded-full flex items-center justify-center px-3 gap-3 border border-primary/10">
                    <button
                        className="bg-secondary w-[110px] text-white p-2 rounded-full cursor-pointer hover:opacity-90 transition"
                        onClick={() => {
                            if (pageNumber > 1) {
                                setPageNumber(pageNumber - 1);
                                setLoading(true);
                            } else {
                                toast.success("You are on the first page");
                            }
                        }}
                    >
                        Previous
                    </button>

                    <span className="text-sm text-primary w-[130px] text-center font-medium">
                        Page {pageNumber} of {totalPages}
                    </span>

                    <button
                        className="bg-secondary text-white p-2 rounded-full w-[110px] cursor-pointer hover:opacity-90 transition"
                        onClick={() => {
                            if (pageNumber < totalPages) {
                                setPageNumber(pageNumber + 1);
                                setLoading(true);
                            } else {
                                toast.success("You are on the last page");
                            }
                        }}
                    >
                        Next
                    </button>

                    <select
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(parseInt(e.target.value));
                            setPageNumber(1);
                            setLoading(true);
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