import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import uploadFile from "../../utils/mediaUpload";

export default function AdminAddProductPage() {
    const [productId, setProductId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [altNames, setAltNames] = useState("");
    const [price, setPrice] = useState("");
    const [labelledPrice, setLabelledPrice] = useState("");
    const [category, setCategory] = useState("Others");
    const [brand, setBrand] = useState("Generic");
    const [model, setModel] = useState("");
    const [isVisible, setIsVisible] = useState(true);
    const [files, setFiles] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const inputClass =
        "border border-primary/15 bg-white rounded-xl h-[50px] px-4 m-2 outline-none focus:ring-2 focus:ring-secondary transition";
    const labelClass = "font-semibold ml-2 text-primary";

    async function handleAddProduct() {
        try {
            if (name.trim() === "") {
                toast.error("Product name cannot be empty");
                return;
            }

            if (description.trim() === "") {
                toast.error("Product description cannot be empty");
                return;
            }

            const token = localStorage.getItem("token");

            if (!token) {
                toast.error("You must be logged in to add a product");
                navigate("/login");
                return;
            }

            setIsSubmitting(true);

            const fileArray = Array.from(files || []);
            const imageURLs = await Promise.all(fileArray.map((file) => uploadFile(file)));

            await axios.post(
                import.meta.env.VITE_API_URL + "/products",
                {
                    productId,
                    name,
                    description,
                    price,
                    labelledPrice,
                    altNames: altNames
                        .split(",")
                        .map((item) => item.trim())
                        .filter(Boolean),
                    images: imageURLs,
                    category,
                    brand,
                    model,
                    isVisible: isVisible === true || isVisible === "true",
                },
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );

            toast.success("Product added successfully");
            navigate("/admin/products");
        } catch (err) {
            toast.error(err?.response?.data?.message || "Failed to add product");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="w-full max-h-full overflow-y-auto hide-scroll-track bg-accent rounded-2xl p-4">
            <h1 className="w-full text-3xl font-bold mb-6 sticky top-0 bg-accent py-3 text-primary z-10">
                Add New Product
            </h1>

            <div className="flex flex-wrap items-start">
                <div className="w-full md:w-1/2 h-[120px] flex flex-col">
                    <label className={labelClass}>Product ID</label>
                    <input
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                        placeholder="Ex: ID001"
                        className={inputClass}
                    />
                </div>

                <div className="w-full md:w-1/2 h-[120px] flex flex-col">
                    <label className={labelClass}>Product Name</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ex: Laptop"
                        className={inputClass}
                    />
                </div>

                <div className="w-full h-[180px] flex flex-col">
                    <label className={labelClass}>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter product description"
                        className="border border-primary/15 bg-white rounded-xl h-[110px] px-4 py-3 m-2 outline-none focus:ring-2 focus:ring-secondary transition resize-none"
                    />
                </div>

                <div className="w-full h-[120px] flex flex-col">
                    <label className={labelClass}>Images</label>
                    <input
                        multiple
                        type="file"
                        onChange={(e) => setFiles(e.target.files)}
                        className="border border-primary/15 bg-white rounded-xl h-[50px] px-4 py-3 m-2 outline-none focus:ring-2 focus:ring-secondary transition"
                    />
                </div>

                <div className="w-full h-[120px] flex flex-col">
                    <label className={labelClass}>Alternative Names (Comma Separated)</label>
                    <input
                        value={altNames}
                        onChange={(e) => setAltNames(e.target.value)}
                        placeholder="Ex: Laptop, Notebook, Portable Computer"
                        className={inputClass}
                    />
                </div>

                <div className="w-full md:w-1/2 h-[120px] flex flex-col">
                    <label className={labelClass}>Price</label>
                    <input
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        type="number"
                        placeholder="Ex: 50000"
                        className={inputClass}
                    />
                </div>

                <div className="w-full md:w-1/2 h-[120px] flex flex-col">
                    <label className={labelClass}>Labelled Price</label>
                    <input
                        value={labelledPrice}
                        onChange={(e) => setLabelledPrice(e.target.value)}
                        type="number"
                        placeholder="Ex: 60000"
                        className={inputClass}
                    />
                </div>

                <div className="w-full md:w-1/4 h-[120px] flex flex-col">
                    <label className={labelClass}>Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className={inputClass}
                    >
                        <option value="Others">Others</option>
                        <option value="Laptops">Laptops</option>
                        <option value="Desktops">Desktops</option>
                        <option value="Components">Components</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Peripherals">Peripherals</option>
                    </select>
                </div>

                <div className="w-full md:w-1/4 h-[120px] flex flex-col">
                    <label className={labelClass}>Brand</label>
                    <select
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        className={inputClass}
                    >
                        <option value="Generic">Generic</option>
                        <option value="Dell">Dell</option>
                        <option value="HP">HP</option>
                        <option value="Lenovo">Lenovo</option>
                        <option value="Asus">Asus</option>
                        <option value="Acer">Acer</option>
                        <option value="Apple">Apple</option>
                    </select>
                </div>

                <div className="w-full md:w-1/4 h-[120px] flex flex-col">
                    <label className={labelClass}>Model</label>
                    <input
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        placeholder="Ex: Inspiron 15"
                        className={inputClass}
                    />
                </div>

                <div className="w-full md:w-1/4 h-[120px] flex flex-col">
                    <label className={labelClass}>Is Visible</label>
                    <select
                        value={String(isVisible)}
                        onChange={(e) => setIsVisible(e.target.value)}
                        className={inputClass}
                    >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
            </div>

            <div className="w-full bg-white sticky bottom-0 rounded-b-2xl flex justify-end items-center p-4 gap-4 border-t border-primary/10 mt-4">
                <button
                    onClick={() => navigate("/admin/products")}
                    className="bg-gray-400 text-white font-bold px-6 py-3 rounded-xl hover:bg-gray-500 transition"
                >
                    Cancel
                </button>

                <button
                    onClick={handleAddProduct}
                    disabled={isSubmitting}
                    className="bg-secondary text-white font-bold px-6 py-3 rounded-xl hover:opacity-90 transition disabled:opacity-50"
                >
                    {isSubmitting ? "Adding..." : "Add Product"}
                </button>
            </div>
        </div>
    );
}