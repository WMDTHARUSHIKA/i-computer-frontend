import { useState } from "react";
import { addToCart, getCart, getCartTotal } from "../utils/cart";
import { BiMinus, BiPlus } from "react-icons/bi";
import getFormattedPrice from "../utils/price-format";
import { Link } from "react-router-dom";

export default function Cart() {
    const [cart, setCart] = useState(getCart());

    function getProductImage(product) {
        return (
            product.image ||
            product.images?.[0] ||
            "/images/default-product-1.png"
        );
    }

    function getCheckoutCart() {
        return cart.map((item) => ({
            product: {
                name: item.product.name,
                price: item.product.price,
                labelledPrice: item.product.labelledPrice,
                image: getProductImage(item.product),
                images: item.product.images || [],
                productId: item.product.productId,
                brand: item.product.brand || "",
                model: item.product.model || "",
            },
            qty: item.qty,
        }));
    }

    return (
        <div className="w-full min-h-[calc(100vh-100px)] bg-accent overflow-y-auto hide-scroll-track">
            <div className="w-full max-w-5xl mx-auto flex flex-col gap-5 p-4 lg:p-8">
                <div className="mb-2">
                    <h1 className="text-3xl font-black text-primary">Your Cart</h1>
                    <p className="text-primary/70 mt-2">
                        Review your selected products before checkout.
                    </p>
                </div>

                {cart.length === 0 ? (
                    <div className="bg-white rounded-3xl shadow-md p-10 text-center border border-primary/10">
                        <h2 className="text-2xl font-bold text-primary">Your cart is empty</h2>
                        <p className="text-primary/60 mt-3">
                            Add some products to continue shopping.
                        </p>
                        <Link
                            to="/products"
                            className="inline-flex mt-6 px-6 py-3 rounded-2xl bg-secondary text-white font-semibold hover:opacity-90 transition"
                        >
                            Browse Products
                        </Link>
                    </div>
                ) : (
                    <>
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
                                                    addToCart(cartItem.product, -1);
                                                    setCart(getCart());
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
                                                    addToCart(cartItem.product, 1);
                                                    setCart(getCart());
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

                        <div className="bg-white w-full sticky bottom-4 rounded-3xl shadow-xl border border-primary/10 flex flex-col sm:flex-row items-center justify-between gap-4 p-5">
                            <Link
                                state={getCheckoutCart()}
                                to="/checkout"
                                className="bg-secondary text-white px-6 py-3 rounded-2xl hover:opacity-90 transition font-semibold"
                            >
                                Checkout
                            </Link>

                            <span className="text-2xl font-black text-primary">
                                Total:{" "}
                                <span className="text-secondary">
                                    {getFormattedPrice(getCartTotal(cart))}
                                </span>
                            </span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}