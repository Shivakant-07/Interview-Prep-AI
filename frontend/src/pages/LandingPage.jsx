import React, { useState, useContext } from 'react';

import Modal from "../componenets/Modal";
import Login from "../pages/Auth/Login";
import SignUp from "../pages/Auth/SignUp";

import HERO_IMG from "../assets/hero-img.png";
import { APP_FEATURES } from "../utils/data"
import { useNavigate } from 'react-router-dom';
import { LuSparkles } from 'react-icons/lu'
import { UserContext } from '../context/userContext';
import ProfileInfoCard from '../componenets/Cards/ProfileInfoCard';
import { Link } from "react-router-dom";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const LandingPage = () => {
    const { user } = useContext(UserContext);

    const navigate = useNavigate();

    const [openAuthModal, setOpenAuthModal] = useState(false);
    const [currentPage, setCurrentPage] = useState("login");

    const handleCTA = () => {
        if (!user) {
            setOpenAuthModal(true);
        } else {
            navigate("/dashboard");
        }
    };

    // Function to scroll smoothly
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };


    return (
        <>
            <div id='home' className="w-full min-h-full bg-linear-to-b  pb-20 overflow-y-scroll  ">

                <div className="w-full min-h-1/2 max-h-5/6 md:h-screen bg-linear-to-b from-[#618afb] via-[#] to-[#e9eefb] absolute top-0 left-0" />

                <div className=" pt-4 pb-[200px] relative z-10">
                    {/* Header */}
                    <header className=" px-4 md:px-8 lg:px-16 flex justify-between items-center mb-16 pb-4 border-b-2 border-gray-400">
                        <Link to="/">
                            <div className="text-xl text-black font-bold">
                                Interview Prep AI
                            </div>
                        </Link>
                        {user ? (
                            <ProfileInfoCard />
                        ) : (
                            <button
                                className="px-6 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-400 text-white font-bold flex items-center gap-2 shadow-lg hover:from-black hover:to-gray-800 hover:shadow-2xl  transition-all"
                                onClick={() => setOpenAuthModal(true)}
                            >
                                <span className="relative z-10">Login / Sign Up</span>
                            </button>


                        )}
                    </header>
                    {/* Hero Content */}
                    <div className=" px-4 md:px-8 lg:px-16 flex flex-col md:flex-row items-center">
                        <div className="w-full md:w-1/2 pr-4 mb-8 md:mb-0">
                            <div className="flex items-center justify-left mb-2">
                                <div className="flex items-center gap-2 text-[13px] text-amber-600 font-semibold bg-amber-100 px-3 py-1 rounded-full border border-amber">
                                    <LuSparkles /> AI Powered
                                </div>
                            </div>
                            <h1 className="text-5xl text-black font-medium mb-6 leading-tight">
                                Ace Interviews with <br />
                                <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#FF9324_0%,_#FCD760_100%)] bg-[length:200%_200%] animate-text-shine font-semibold">
                                    AI-Powered
                                </span>{" "}
                                Learning
                            </h1>
                        </div>
                        <div className="w-full md:w-1/2">
                            <p className="text-[17px] text-gray-900 mr-0 md:mr-20 mb-6">
                                Get role-specific questions, expand answers when you need them, dive deeper into concepts, and organize everything your way. From preparation to mastery - your ultimate interview toolkit is here.
                            </p>
                            <button
                                className="px-6 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-400 text-white font-bold flex items-center gap-2 shadow-lg hover:from-black hover:to-gray-800 hover:shadow-2xl  transition-all"
                                onClick={handleCTA}

                            >
                                {user ? "Go to Dashboard" : "Get Started"} <span>🚀</span>
                            </button>

                        </div>
                    </div>
                </div>

                {/* Hero IMG Content */}
                <div className="w-full h-full relative z-10 ">
                    <div>
                        <section className="flex items-center justify-center -mt-10">
                            <img
                                src={HERO_IMG}
                                alt="Hero Image"
                                className="w-[80vw] h-auto rounded-lg border"
                            />
                        </section>
                    </div>
                </div>

                {/* 🌟 Features Section */}
                <div id='features' className="w-full px-4 md:px-8 lg:px-16 mt-20 relative z-10 pt-8">
                    <div className="container mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-semibold mb-6">
                            Features That Make You Shine ✨
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
                            Everything you need to prepare smarter, practice better, and ace every interview with confidence.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {APP_FEATURES.map((feature) => (
                                <div
                                    key={feature.id}
                                    className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all border border-gray-100"
                                >
                                    <div className="group bg-white p-5 rounded-lg shadow-md border-l-4 border-amber-400 hover:shadow-xl transition">
                                        <div className="flex items-center mb-3 gap-3">
                                            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-amber-400 text-white text-xl">
                                                <feature.icon />
                                            </div>
                                            <h3 className="text-lg font-semibold">{feature.title}</h3>
                                        </div>
                                        <p className="text-gray-600 text-sm">{feature.description}</p>
                                    </div>

                                </div>
                            ))}

                        </div>
                    </div>
                </div>

                {/* 🌍 Footer Section */}
                <footer className="mt-20 bg-gray-50 border-t border-gray-200">
                    <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">
                        {/* Brand */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Interview Prep AI</h3>
                            <p className="text-sm text-gray-600">
                                Smarter way to prepare for interviews with AI-powered learning and practice.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-3">Quick Links</h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <button
                                        onClick={() => scrollToSection('home')}
                                        className="text-gray-600 hover:text-amber-600 transition-colors"
                                    >
                                        Home
                                    </button>
                                </li>
                                <li>
                                    <Link
                                        to="/dashboard"
                                        className="text-gray-600 hover:text-amber-600 transition-colors"
                                    >
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        onClick={() => scrollToSection('features')}
                                        className="text-gray-600 hover:text-amber-600 transition-colors"
                                    >
                                        Features
                                    </button>
                                </li>
                            </ul>
                        </div>

                        {/* Resources */}
                        <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-3">Resources</h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <a href="#" className="text-gray-600 hover:text-amber-600">Help Center</a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-600 hover:text-amber-600">Documentation</a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-600 hover:text-amber-600">Blog</a>
                                </li>
                            </ul>
                        </div>

                        {/* Connect */}
                        <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-3">Connect</h4>
                            <div className="flex flex-col space-y-2 text-sm">
                                {/* Row 1 */}
                                <a
                                    href="https://twitter.com/example"
                                    target="_blank"
                                    className="flex items-center gap-2 text-gray-600 hover:text-amber-600 transition"
                                >
                                    <FaTwitter className="text-lg" /> Twitter / @example
                                </a>

                                {/* Row 2 */}
                                <a
                                    href="https://linkedin.com/in/example"
                                    target="_blank"
                                    className="flex items-center gap-2 text-gray-600 hover:text-amber-600 transition"
                                >
                                    <FaLinkedin className="text-lg" /> LinkedIn / Example Profile
                                </a>

                                {/* Row 3 */}
                                <a
                                    href="https://github.com/example"
                                    target="_blank"
                                    className="flex items-center gap-2 text-gray-600 hover:text-amber-600 transition"
                                >
                                    <FaGithub className="text-lg" /> GitHub / example
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="border-t border-gray-200 py-4 text-center text-sm text-gray-500">
                        © {new Date().getFullYear()} Interview Prep AI. All rights reserved.
                    </div>
                </footer>



            </div>
            <Modal
                isOpen={openAuthModal}
                onClose={() => {
                    setOpenAuthModal(false);
                    setCurrentPage("login");
                }}
                hideHeader
            >
                <div>
                    {currentPage === "login" && (
                        <Login setCurrentPage={setCurrentPage} />
                    )}
                    {currentPage === "signup" && (
                        <SignUp setCurrentPage={setCurrentPage} />
                    )}
                </div>
            </Modal>
        </>
    )
}

export default LandingPage