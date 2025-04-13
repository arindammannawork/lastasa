import { useState, useEffect } from 'react';

import ProductCard from './ProductCard';

export default function ProductList({ result }) {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    // Sample product data
    const products = [
        {
            id: 1,
            name: "Oneplus Bullets Z2 Bluetooth Wireless in Ear Earphones",
            image: "https://m.media-amazon.com/images/I/815dLQKYIYL._AC_UL320_.jpg",
            rating: 4,
            reviews: 189377,
            purchases: "30K+ bought in past month",
            price: "₹1,299",
            originalPrice: "₹2,299",
            discount: "43% off"
        },
        {
            id: 2,
            name: "Oneplus Bullets Z2 Bluetooth Wireless in Ear Earphones",
            image: "https://m.media-amazon.com/images/I/815dLQKYIYL._AC_UL320_.jpg",
            rating: 4,
            reviews: 189377,
            purchases: "30K+ bought in past month",
            price: "₹1,299",
            originalPrice: "₹2,299",
            discount: "43% off"
        },
        {
            id: 3,
            name: "Oneplus Bullets Z2 Bluetooth Wireless in Ear Earphones",
            image: "https://m.media-amazon.com/images/I/815dLQKYIYL._AC_UL320_.jpg",
            rating: 4,
            reviews: 189377,
            purchases: "30K+ bought in past month",
            price: "₹1,299",
            originalPrice: "₹2,299",
            discount: "43% off"
        },
        {
            id: 4,
            name: "Oneplus Bullets Z2 Bluetooth Wireless in Ear Earphones",
            image: "https://m.media-amazon.com/images/I/815dLQKYIYL._AC_UL320_.jpg",
            rating: 4,
            reviews: 189377,
            purchases: "30K+ bought in past month",
            price: "₹1,299",
            originalPrice: "₹2,299",
            discount: "43% off"
        }
    ];



    return (
        <div className=" py-12 px-4 md:px-8 relative overflow-hidden">
            {/* Background Particles */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-blue-400/10"
                        style={{
                            width: Math.random() * 6 + 2 + 'px',
                            height: Math.random() * 6 + 2 + 'px',
                            top: Math.random() * 100 + '%',
                            left: Math.random() * 100 + '%',
                            opacity: Math.random() * 0.3 + 0.1,
                            animation: `float ${Math.random() * 20 + 10}s linear infinite`
                        }}
                    />
                ))}
            </div>

            {/* Section Heading */}
            <div className={`text-center mb-10 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white relative inline-block">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Top suggested Products</span>
                    <span className="text-white"> according to your search...</span>
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full transform scale-x-0 transition-transform duration-1000 origin-left animate-pulse" style={{ animationDuration: '3s', transform: isLoaded ? 'scaleX(1)' : 'scaleX(0)' }}></div>
                </h2>
                <p className="text-gray-300 max-w-4xl mx-auto">
                    717 inspirational designs, illustrations, and graphic elements from the world's best designers.
                    Want more inspiration? Browse our search results...
                </p>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {result?.map((product, index) => (
                    <ProductCard product={product} index={index} key={index} isLoaded={isLoaded} />
                ))}
            </div>

            {/* Animation keyframes */}
            <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-15px) translateX(15px); }
          50% { transform: translateY(-5px) translateX(25px); }
          75% { transform: translateY(-25px) translateX(-15px); }
          100% { transform: translateY(0) translateX(0); }
        }
      `}</style>
        </div>
    );
}