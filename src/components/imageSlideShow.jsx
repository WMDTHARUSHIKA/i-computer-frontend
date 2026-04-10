import { useState } from "react";

export default function ImageSlideShow(props) {
    const images = props.images;
    const [activeImage, setActiveImage] = useState(0);

    function getClass(index) {
        if (index === activeImage) {
            return "h-[85px] w-[85px] rounded-2xl shadow-md cursor-pointer border-4 border-[#4C763B] scale-105 transition-all duration-300";
        } else {
            return "h-[85px] w-[85px] rounded-2xl shadow-sm cursor-pointer border border-[#1B0C0C]/10 hover:scale-105 transition-all duration-300";
        }
    }

    return (
        <div className="w-[500px] max-w-full h-auto flex flex-col bg-[#F1F0E9] rounded-2xl p-4 shadow-lg">
            <img
                src={images[activeImage]}
                alt="Active product"
                className="h-[500px] w-full object-cover rounded-2xl shadow-md transition-all duration-300"
            />

            <div className="w-full min-h-[100px] flex flex-row px-2 gap-4 justify-center items-center mt-4 flex-wrap">
                {images.map((img, index) => {
                    return (
                        <img
                            onClick={() => {
                                setActiveImage(index);
                            }}
                            key={index}
                            src={img}
                            alt={`Thumbnail ${index + 1}`}
                            className={getClass(index)}
                        />
                    );
                })}
            </div>
        </div>
    );
}