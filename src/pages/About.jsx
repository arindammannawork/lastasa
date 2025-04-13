import { Search, Image, Mic, MapPin, Clock, ThumbsUp } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link, useNavigate, useNavigation } from 'react-router';
import arindam_img from "../assets/images/arindam.png"
import akash_img from "../assets/images/akash.png"
import souvik_img from "../assets/images/souvik.jpg"

export default function AboutPage() {
    const navigate = useNavigate()
    const teamMembers = [
        {
            name: "Souvik Samanta",
            designation: "SDE",
            experience: "1+ years experience in SDE",
            image: souvik_img
        },
        {
            name: "Arindam Manna",
            designation: "FullStack Developer",
            experience: "2+ years experience in Web Developer",
            image: arindam_img
        },
        {
            name: "Akash Koley",
            designation: "AI ML Developer",
            experience: "1+ years experience in AI, ML and Data analysis",
            image: akash_img
        }
    ];

    const features = [
        {
            title: "Text Search",
            description: "Find products using natural language prompts",
            icon: <Search className="h-6 w-6 text-blue-400" />
        },
        {
            title: "Image Recognition",
            description: "Upload images to find similar products",
            icon: <Image className="h-6 w-6 text-blue-400" />
        },
        {
            title: "Voice Search",
            description: "Speak to search for products hands-free",
            icon: <Mic className="h-6 w-6 text-blue-400" />
        },
        {
            title: "Regional Recommendations",
            description: "Products tailored to your location",
            icon: <MapPin className="h-6 w-6 text-blue-400" />
        },
        {
            title: "Time-Based Suggestions",
            description: "Seasonal and timely product recommendations",
            icon: <Clock className="h-6 w-6 text-blue-400" />
        },
        {
            title: "AI-Powered Reviews",
            description: "Smart analysis of product reviews for better decisions",
            icon: <ThumbsUp className="h-6 w-6 text-blue-400" />
        }
    ];

    return (
        <>

            <Navbar />
            <div className="min-h-screen bg-gray-900 text-gray-100">
                {/* Hero Section */}
                <section className="py-20 px-6">
                    <div className="container mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">About <span className="text-blue-400">LASTASA</span></h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Revolutionizing e-commerce with AI-powered product discovery
                        </p>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="py-12 px-6 bg-gray-800">
                    <div className="container mx-auto">
                        <h2 className="text-3xl font-bold mb-8 text-center">Our Mission</h2>
                        <p className="text-lg text-gray-300 max-w-3xl mx-auto text-center">
                            LASTASA aims to transform how people discover products online by leveraging
                            cutting-edge AI technology. We analyze prompts, images, and voice inputs to
                            provide personalized product recommendations based on your region, time, and preferences.
                        </p>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-16 px-6">
                    <div className="container mx-auto">
                        <h2 className="text-3xl font-bold mb-12 text-center">What We Offer</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {features.map((feature, index) => (
                                <div key={index} className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition duration-300">
                                    <div className="mb-4">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                    <p className="text-gray-400">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="py-16 px-6 bg-gray-800">
                    <div className="container mx-auto">
                        <h2 className="text-3xl font-bold mb-12 text-center">Meet the ASA Team</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                            {teamMembers.map((member, index) => (
                                <div key={index} className="bg-gray-900 rounded-lg p-6 text-center hover:shadow-lg transition duration-300">
                                    <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                                        <img
                                            src={member.image}
                                            alt={`${member.name}'s profile`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                                    <p className="text-blue-400 mb-2">{member.designation}</p>
                                    <p className="text-sm text-gray-400">{member.experience}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="py-16 px-6">
                    <div className="container mx-auto text-center max-w-2xl">
                        <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
                        <p className="text-gray-300 mb-8">
                            Have questions about LASTASA? We'd love to hear from you!
                        </p>
                        <Link to="mailto:teamlastasa@gmail.com" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
                            Contact Us
                        </Link>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-20 px-6 bg-gradient-to-r from-blue-900 to-purple-900">
                    <div className="container mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Shopping Experience?</h2>
                        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                            Join LASTASA today and discover products tailored specifically for you.
                        </p>
                        <button onClick={() => { navigate('/') }} className="bg-white text-gray-900 hover:bg-gray-200 font-bold py-3 px-8 rounded-lg transition duration-300">
                            Get Started
                        </button>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}