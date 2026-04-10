import { useEffect, useState } from "react";
import { getCartTotal } from "../utils/cart";
import { BiMinus, BiPlus } from "react-icons/bi";
import getFormattedPrice from "../utils/price-format";
import { useLocation, useNavigate } from "react-router-dom";
import CheckOutDetailsModal from "../components/checkoutDetailsModal";

export default function Checkout() {
    const location = useLocation();
    const navigate = useNavigate();
    const [cart, setCart] = useState(() => location.state || []);

    useEffect(() => {
        if (!location.state || location.state.length === 0) {
            navigate("/products");
        }
    }, [location.state, navigate]);

    useEffect(() => {
        if (cart.length === 0) {
            navigate("/products");
        }
    }, [cart, navigate]);

    function getProductImage(product) {
        return (
            product.image ||
            product.images?.[0] ||
            "/images/default-product-1.png"
        );
    }

    return (
        <div className="w-full min-h-[calc(100vh-100px)] bg-accent overflow-y-auto hide-scroll-track">
            <div className="w-full max-w-5xl mx-auto flex flex-col gap-5 p-4 lg:p-8">
                <div>
                    <h1 className="text-3xl font-black text-primary">Checkout</h1>
                    <p className="text-primary/70 mt-2">
                        Review your order and confirm your purchase.
                    </p>
                </div>

                {cart.map((cartItem, index) => (
                    <div
                        key={index}
                        className="w-full bg-white rounded-3xl shadow-md border border-primary/10 overflow-hidden flex flex-col sm:flex-row"
                    >
                        <img
                            className="w-full sm:w-[160px] h-[160px] object-cover bg-accent"
                            src={getProductImage(cartItem.product)}
                            alt={cartItem.product.name}
                        />

                        <div className="flex-1 p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                            <div className="flex-1">
                                <p className="text-xs text-primary/50">
                                    {cartItem.product.productId}
                                </p>

                                <h1 className="text-xl font-bold text-primary mt-1">
                                    {cartItem.product.name}
                                </h1>

                                <div className="w-[180px] h-[48px] mt-5 border border-primary/10 rounded-full flex overflow-hidden bg-accent">
                                    <button
                                        onClick={() => {
                                            const newCart = [...cart];
                                            newCart[index].qty -= 1;

                                            if (newCart[index].qty <= 0) {
                                                newCart.splice(index, 1);
                                            }

                                            setCart(newCart);
                                        }}
                                        className="w-[60px] h-full flex justify-center items-center text-2xl text-primary hover:bg-primary hover:text-accent transition"
                                    >
                                        <BiMinus />
                                    </button>

                                    <span className="w-[60px] h-full flex justify-center items-center text-lg font-bold text-primary">
                                        {cartItem.qty}
                                    </span>

                                    <button
                                        onClick={() => {
                                            const newCart = [...cart];
                                            newCart[index].qty += 1;
                                            setCart(newCart);
                                        }}
                                        className="w-[60px] h-full flex justify-center items-center text-2xl text-primary hover:bg-primary hover:text-accent transition"
                                    >
                                        <BiPlus />
                                    </button>
                                </div>
                            </div>

                            <div className="min-w-[150px] flex flex-col justify-center items-start lg:items-end">
                                {cartItem.product.labelledPrice > cartItem.product.price && (
                                    <span className="text-sm text-primary/40 line-through">
                                        {getFormattedPrice(cartItem.product.labelledPrice)}
                                    </span>
                                )}

                                <span className="text-sm text-secondary font-semibold">
                                    {getFormattedPrice(cartItem.product.price)}
                                </span>

                                <span className="text-2xl text-secondary font-black">
                                    {getFormattedPrice(
                                        cartItem.product.price * cartItem.qty
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}

                {cart.length > 0 && (
                    <div className="bg-white w-full sticky bottom-4 rounded-3xl shadow-xl border border-primary/10 flex flex-col sm:flex-row items-center justify-between gap-4 p-5">
                        <CheckOutDetailsModal cart={cart} />

                        <span className="text-2xl font-black text-primary">
                            Total:{" "}
                            <span className="text-secondary">
                                {getFormattedPrice(getCartTotal(cart))}
                            </span>
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}