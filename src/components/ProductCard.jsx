import { Link } from "react-router-dom";
import getFormattedPrice from "../utils/price-format";

export default function ProductCard(props) {
    const product = props.product;

    const firstImage = product.images?.[0] || "/images/default-product-1.png";
    const secondImage = product.images?.[1] || firstImage;

    return (
        <Link
            to={"/overview/" + product.productId}
            className="w-[300px] h-[420px] m-4 rounded-2xl shadow-md bg-white overflow-hidden hover:shadow-2xl transition-all duration-300 relative group border border-[#1B0C0C]/10"
        >
            <div className="bg-white absolute top-0 left-0 w-full">
                <img
                    src={secondImage}
                    alt={product.name}
                    className="h-[250px] w-full object-cover"
                />
            </div>

            <div className="bg-white main-image w-full absolute top-0 left-0 transition-opacity duration-500 group-hover:opacity-0">
                <img
                    src={firstImage}
                    alt={product.name}
                    className="h-[250px] w-full object-cover"
                />
            </div>

            <div className="h-[170px] w-full absolute bottom-0 flex justify-center flex-col p-4 bg-[#F1F0E9]">
                <span className="text-xs text-[#1B0C0C]/50">{product.productId}</span>

                <h1 className="font-semibold text-lg text-[#1B0C0C] line-clamp-2">
                    {product.name}
                </h1>

                {product.labelledPrice > product.price && (
                    <p className="text-sm text-red-600 line-through opacity-70 mt-1">
                        {getFormattedPrice(product.labelledPrice)}
                    </p>
                )}

                <p className="text-lg font-bold text-[#4C763B] mt-1">
                    {getFormattedPrice(product.price)}
                </p>
            </div>
        </Link>
    );
}