import { useState, useEffect } from 'react';


export default function AnimatedHeroHeader({ loaded, searchMethods, highlightIndex }) {






    return (
        <>

            {/* <div className="relative text-white bdr"> */}


            {/* Content */}
            {/* <div className="container mx-auto px-4 py-20 relative z-10"> */}
            {/* Main heading with slide-in animation */}
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 transition-all duration-1000 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <span className="inline-block">Discover</span>{' '}
                <span className="inline-block pb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Anything,</span>{' '}
                <span className="inline-block">Anywhere</span>{' '}
                <span className="inline-block text-blue-400">—</span>{' '}
                <span className="inline-block relative">
                    Smarter.
                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-blue-400 transform scale-x-0 transition-transform duration-1000 delay-500 origin-left" style={{ animationDelay: '0.8s', transform: loaded ? 'scaleX(1)' : 'scaleX(0)' }}></span>
                </span>
            </h1>

            {/* Subtitle with staggered fade-in */}
            <p className={`text-lg md:text-xl text-gray-300 max-w-3xl transition-all duration-1000 delay-300 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                Search products across platforms using {' '}
                {searchMethods.map((method, index) => (
                    <span
                        key={index}
                        className={`inline-flex items-center mx-1 transition-all duration-300 ${highlightIndex === index ? 'text-blue-400 font-bold scale-110' : 'text-gray-300'}`}
                    >
                        <span className="mr-1">{method.icon}</span>
                        {method.text}
                    </span>
                ))}
                {' '} — personalized by region, time, and place.
            </p>

            {/* Animated line */}
            <div className="mt-8 relative h-1 max-w-lg">
                <div className={`absolute h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 transition-all duration-1000 delay-700 rounded-full ${loaded ? 'w-full' : 'w-0'}`}></div>
                <div className="absolute h-full w-16 bg-white/30 blur-sm rounded-full animate-pulse" style={{ animationDuration: '3s', left: (highlightIndex * 25) + '%', transition: 'left 1s ease-in-out' }}></div>
            </div>


            {/* </div> */}

            {/* Add keyframes for floating animation */}
            <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(20px); }
          75% { transform: translateY(-30px) translateX(-10px); }
          100% { transform: translateY(0) translateX(0); }
        }
      `}</style>
            {/* </div> */}
        </>
    );
}