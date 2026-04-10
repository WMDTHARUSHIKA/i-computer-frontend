import { Link, useLocation } from "react-router-dom";

export default function OrderSuccessPage() {
    const location = useLocation();
    const orderId = location.state?.orderId || "";

    return (
        <div className="w-full min-h-[calc(100vh-100px)] bg-accent flex justify-center items-center px-4 py-10">
            <div className="w-full max-w-[600px] bg-white rounded-3xl shadow-xl border border-primary/10 p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-secondary/10 text-secondary flex items-center justify-center mx-auto text-4xl font-black">
                    ✓
                </div>

                <h1 className="text-3xl font-black text-primary mt-6">
                    Order Placed Successfully
                </h1>

                <p className="text-primary/70 mt-3 leading-7">
                    Thank you for your purchase. Your order has been saved successfully.
                </p>

                {orderId && (
                    <div className="mt-6 bg-accent rounded-2xl p-4 border border-primary/10">
                        <p className="text-sm text-primary/60">Order ID</p>
                        <p className="text-2xl font-black text-secondary mt-1">
                            {orderId}
                        </p>
                    </div>
                )}

                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/my-orders"
                        className="px-6 py-3 rounded-2xl bg-secondary text-white font-semibold hover:opacity-90 transition"
                    >
                        View My Orders
                    </Link>

                    <Link
                        to="/products"
                        className="px-6 py-3 rounded-2xl bg-primary text-accent font-semibold hover:opacity-90 transition"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
}