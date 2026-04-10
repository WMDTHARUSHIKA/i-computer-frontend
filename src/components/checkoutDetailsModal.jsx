import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { CgClose } from "react-icons/cg";

export default function CheckOutDetailsModal(props) {
    const [isVisible, setIsVisible] = useState(false);
    const [isProfileLoading, setIsProfileLoading] = useState(false);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [phone, setPhone] = useState("");

    const navigate = useNavigate();
    const cart = props.cart || [];

    useEffect(() => {
        if (!isVisible) return;

        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("Please login to continue checkout");
            navigate("/login");
            return;
        }

        setIsProfileLoading(true);

        axios
            .get(import.meta.env.VITE_API_URL + "/users/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const user = response.data || {};

                setFirstName(user.firstName || "");
                setLastName(user.lastName || "");

                // These fields will auto-fill only if your backend/user model returns them
                setAddressLine1(user.addressLine1 || "");
                setAddressLine2(user.addressLine2 || "");
                setCity(user.city || "");
                setPostalCode(user.postalCode || "");
                setPhone(user.phone || "");
            })
            .catch((error) => {
                console.log(error);

                if (error?.response?.status === 401) {
                    localStorage.removeItem("token");
                    navigate("/login");
                } else {
                    toast.error("Failed to load your profile");
                }
            })
            .finally(() => {
                setIsProfileLoading(false);
            });
    }, [isVisible, navigate]);

    async function placeOrder() {
        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("You must be logged in to place an order");
            navigate("/login");
            return;
        }

        if (cart.length === 0) {
            toast.error("Your cart is empty");
            return;
        }

        if (!addressLine1.trim()) {
            toast.error("Address Line 1 is required");
            return;
        }

        if (!addressLine2.trim()) {
            toast.error("Address Line 2 is required");
            return;
        }

        if (!city.trim()) {
            toast.error("City is required");
            return;
        }

        if (!postalCode.trim()) {
            toast.error("Postal Code is required");
            return;
        }

        if (!phone.trim()) {
            toast.error("Phone number is required");
            return;
        }

        const order = {
            firstName,
            lastName,
            addressLine1,
            addressLine2,
            city,
            postalCode,
            phone,
            country: "Sri Lanka",
            items: cart.map((item) => ({
                productId: item.product.productId,
                qty: item.qty,
            })),
        };

        try {
            setIsPlacingOrder(true);

            const response = await axios.post(
                import.meta.env.VITE_API_URL + "/orders",
                order,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success("Order placed successfully");

            // clear cart saved in localStorage
            localStorage.removeItem("cart");

            setIsVisible(false);

            navigate("/order-success", {
                state: {
                    orderId: response?.data?.orderId || "",
                },
            });
        } catch (err) {
            toast.error(
                err?.response?.data?.message ||
                    "Failed to place the order. Please try again."
            );
        } finally {
            setIsPlacingOrder(false);
        }
    }

    return (
        <>
            <button
                className="bg-secondary text-white px-5 py-3 rounded-2xl hover:opacity-90 transition font-semibold"
                onClick={() => setIsVisible(true)}
            >
                Confirm Checkout
            </button>

            {isVisible && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 px-4">
                    <div className="w-full max-w-[480px] bg-white rounded-3xl shadow-2xl p-6 relative border border-primary/10">
                        <button
                            onClick={() => setIsVisible(false)}
                            className="w-10 h-10 flex items-center justify-center rounded-full text-primary absolute right-4 top-4 text-xl hover:bg-red-500 hover:text-white transition-all duration-300"
                        >
                            <CgClose />
                        </button>

                        <h1 className="text-2xl font-black text-primary mb-1">
                            Checkout Details
                        </h1>
                        <p className="text-sm text-primary/60 mb-5">
                            Confirm your delivery information before placing the order.
                        </p>

                        {isProfileLoading ? (
                            <div className="py-10 flex flex-col items-center justify-center">
                                <div className="w-10 h-10 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
                                <p className="mt-4 text-primary/70">
                                    Loading your details...
                                </p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3">
                                <input
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="w-full border border-primary/15 bg-accent rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-secondary transition"
                                    type="text"
                                    placeholder="First Name"
                                />

                                <input
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="w-full border border-primary/15 bg-accent rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-secondary transition"
                                    type="text"
                                    placeholder="Last Name"
                                />

                                <input
                                    value={addressLine1}
                                    onChange={(e) => setAddressLine1(e.target.value)}
                                    className="w-full border border-primary/15 bg-accent rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-secondary transition"
                                    type="text"
                                    placeholder="Address Line 1"
                                />

                                <input
                                    value={addressLine2}
                                    onChange={(e) => setAddressLine2(e.target.value)}
                                    className="w-full border border-primary/15 bg-accent rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-secondary transition"
                                    type="text"
                                    placeholder="Address Line 2"
                                />

                                <input
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    className="w-full border border-primary/15 bg-accent rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-secondary transition"
                                    type="text"
                                    placeholder="City"
                                />

                                <input
                                    value={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                    className="w-full border border-primary/15 bg-accent rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-secondary transition"
                                    type="text"
                                    placeholder="Postal Code"
                                />

                                <input
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full border border-primary/15 bg-accent rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-secondary transition"
                                    type="text"
                                    placeholder="Phone Number"
                                />

                                <button
                                    onClick={placeOrder}
                                    disabled={isPlacingOrder}
                                    className="bg-primary text-white px-4 py-3 rounded-xl hover:bg-secondary transition-all duration-300 mt-3 shadow-md font-medium disabled:opacity-60"
                                >
                                    {isPlacingOrder ? "Placing Order..." : "Place Order"}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}