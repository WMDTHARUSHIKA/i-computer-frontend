import { useState } from "react";
import getFormattedDate from "../utils/date-format";
import getFormattedPrice from "../utils/price-format";
import { CgClose } from "react-icons/cg";

export default function CustomerViewOrderInfoModal(props) {
    const [isVisible, setIsVisible] = useState(false);
    const order = props.order;

    return (
        <>
            <button
                className="bg-[#4C763B] text-white px-4 py-2 rounded-xl hover:bg-[#3d612f] transition-all duration-300 shadow-md"
                onClick={() => setIsVisible(true)}
            >
                View Details
            </button>

            {isVisible && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
                    <div className="w-full max-w-[700px] max-h-[90vh] bg-[#F1F0E9] rounded-2xl relative shadow-2xl overflow-hidden">
                        <button
                            className="absolute w-10 h-10 text-[#1B0C0C] text-2xl rounded-full hover:bg-red-500 hover:text-white cursor-pointer flex justify-center items-center right-4 top-4 transition-all duration-300 z-10"
                            onClick={() => setIsVisible(false)}
                        >
                            <CgClose />
                        </button>

                        <div className="w-full bg-[#4C763B] text-white p-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                <h1 className="text-2xl font-bold">{order.orderId}</h1>
                                <h2 className="text-sm md:text-base text-white/90">
                                    {getFormattedDate(order.date)}
                                </h2>
                            </div>

                            <div className="mt-4">
                                <h1 className="text-lg font-semibold">
                                    {order.firstName + " " + order.lastName}
                                </h1>
                                <h2 className="text-sm text-white/80">{order.email}</h2>
                            </div>

                            <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                <h1 className="text-lg font-semibold">
                                    Total: {getFormattedPrice(order.total)}
                                </h1>
                                <h2 className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full w-fit">
                                    Status: {order.status}
                                </h2>
                            </div>

                            <div className="mt-4">
                                <h1 className="text-base font-semibold mb-1">Notes:</h1>
                                <p className="text-sm text-white/90">
                                    {order.notes || "No notes available."}
                                </p>
                            </div>
                        </div>

                        <div className="w-full p-5 overflow-y-auto max-h-[420px]">
                            {order.items.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="w-full h-auto flex items-center justify-between mb-4 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300"
                                    >
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="h-[70px] w-[70px] object-cover rounded-xl border border-[#1B0C0C]/10"
                                            />
                                            <div className="flex flex-col">
                                                <span className="text-base font-semibold text-[#1B0C0C]">
                                                    {item.name}
                                                </span>
                                                <span className="text-sm text-[#1B0C0C]/60">
                                                    Qty: {item.qty}
                                                </span>
                                            </div>
                                        </div>
                                        <span className="text-base font-bold text-[#4C763B]">
                                            {getFormattedPrice(item.price)}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}