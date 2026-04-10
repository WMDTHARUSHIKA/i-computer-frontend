import { useState } from "react";
import { CgClose } from "react-icons/cg";
import getFormattedDate from "../utils/date-format";
import getFormattedPrice from "../utils/price-format";

export default function ViewOrderInfoModal({ order }) {
    const [isVisible, setIsVisible] = useState(false);

    if (!order) return null;

    return (
        <>
            <button
                onClick={() => setIsVisible(true)}
                className="bg-secondary text-white px-4 py-2 rounded-xl hover:opacity-90 transition shadow-md"
            >
                View Order
            </button>

            {isVisible && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
                    <div className="w-full max-w-[720px] bg-accent rounded-2xl shadow-2xl overflow-hidden relative border border-primary/10">
                        <button
                            onClick={() => setIsVisible(false)}
                            className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-primary hover:bg-red-500 hover:text-white transition"
                        >
                            <CgClose size={22} />
                        </button>

                        <div className="bg-primary text-accent p-6">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                                <h1 className="text-2xl font-bold">{order.orderId}</h1>
                                <p className="text-sm text-accent/80">
                                    {getFormattedDate(order.date)}
                                </p>
                            </div>

                            <div className="mt-4">
                                <p className="text-lg font-semibold">
                                    {order.firstName} {order.lastName}
                                </p>
                                <p className="text-sm text-accent/80">{order.email}</p>
                            </div>

                            <div className="mt-4 flex flex-col md:flex-row md:justify-between gap-2">
                                <p className="font-semibold">
                                    Total: {getFormattedPrice(order.total)}
                                </p>
                                <p className="bg-secondary px-3 py-1 rounded-full text-sm w-fit">
                                    {order.status}
                                </p>
                            </div>

                            <div className="mt-4">
                                <p className="font-semibold mb-1">Notes</p>
                                <p className="text-sm text-accent/85">
                                    {order.notes || "No notes available."}
                                </p>
                            </div>
                        </div>

                        <div className="p-5 max-h-[420px] overflow-y-auto hide-scroll-track">
                            {order.items?.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between gap-4 bg-white rounded-xl p-4 shadow-sm mb-4 border border-primary/10"
                                >
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-[72px] h-[72px] object-cover rounded-xl border border-primary/10"
                                        />
                                        <div>
                                            <h2 className="font-semibold text-primary">
                                                {item.name}
                                            </h2>
                                            <p className="text-sm text-primary/60">
                                                Qty: {item.qty}
                                            </p>
                                        </div>
                                    </div>

                                    <p className="font-bold text-secondary">
                                        {getFormattedPrice(item.price)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}