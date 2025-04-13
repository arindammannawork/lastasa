import React, { useState } from 'react'
import { Link } from 'react-router';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-gray-900 text-white py-4 px-6 shadow-md sticky top-0 w-full z-50" style={{
            boxShadow: "0 0 20px rgba(255, 255, 255, 0.6)"
        }}>
            <div className="container mx-auto flex gap-8 items-center">
                {/* Logo */}
                <div className="flex items-center">
                    <svg
                        className="h-8 w-8 mr-2 text-blue-500"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                    <span className="font-bold text-xl">LASTASA</span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-4">
                    <Link to="/" className="hover:text-blue-400 transition duration-300">Home</Link>
                    <Link to="/about" className="hover:text-blue-400 transition duration-300">About</Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white focus:outline-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? (
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden mt-2 px-4 pt-2 pb-4 space-y-2">
                    <Link href="/" className="block py-2 hover:text-blue-400 transition duration-300">Home</Link>
                    <Link href="/about" className="block py-2 hover:text-blue-400 transition duration-300">About</Link>
                </div>
            )}
        </nav>
    );
}

export default Navbar