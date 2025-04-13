import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { ShoppingBag, Star, Award } from 'lucide-react';
import { useNavigate } from "react-router";

export default function ProductCard({ product, index, isLoaded }) {
    // Card tilt effect function
    const handleMouseMove = (e) => {
        // const navigate=useNavigate()
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.boxShadow = `0 20px 40px rgba(0, 0, 0, 0.4), 
                       ${(x - centerX) / 10}px ${(y - centerY) / 10}px 20px rgba(0, 0, 255, 0.2)`;
    };

    const handleMouseLeave = (e) => {
        const card = e.currentTarget;
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        card.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
    };

    return (
        <div
            key={product.asin}
            className={`bg-gray-800 rounded-xl overflow-hidden transition-all duration-500 relative group ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            style={{
                transitionDelay: `${index * 100}ms`,
                transition: 'all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1)'
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* ASA's Choice Badge */}
            <div className="absolute top-4 left-4 z-10">
                <div className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center">
                    <Award className="h-3 w-3 mr-1" />
                    ASA's Choice
                </div>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>

            {/* Product Image */}
            <div className="relative h-64 bg-gray-700 overflow-hidden">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Product Details */}
            <div className="p-6 relative z-10">
                <h3 className="text-white text-lg font-bold mb-2 line-clamp-2">
                    {product.title}
                </h3>

                {/* Rating */}
                <div className="flex items-center mb-2">
                    <div className="flex">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`h-4 w-4 ${i < Math.floor(product.stars) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`}
                            />
                        ))}
                    </div>
                    <span className="text-blue-400 ml-2 text-sm">{product.total_reviews}</span>
                </div>

                {/* Purchase Info */}
                <div className="text-green-500 text-sm mb-4">
                    {product.sales_volume} {product.sales_volume ? "till now" : ""}
                </div>

                {/* Price */}
                <div className="flex items-baseline mb-4">
                    <span className="text-white text-2xl font-bold">₹{product.current_price}</span>
                    <span className="text-gray-400 text-sm ml-2">
                        M.R.P: <span className="line-through">₹{product.price_strikethrough}</span>
                        <span className="text-green-500 ml-1">({Math.floor(((product.price_strikethrough - product.current_price) / product.price_strikethrough) * 100)})</span>
                    </span>
                </div>

                {/* Product Site Button */}
                <button type="button" onClick={() => {
                    window.open(product.asin_in_url, "_blank");
                }} className="w-full cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-4 rounded-lg transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 flex items-center justify-center">
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    Go to Product Site
                </button>
            </div>

            {/* Glowing border effect on hover */}
            <div className=" absolute inset-0 rounded-xl border border-transparent group-hover:border-blue-400/30 transition-colors duration-300 pointer-events-none"></div>
        </div>
    );
}