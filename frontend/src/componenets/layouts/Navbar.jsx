import React, { useContext } from 'react';
import ProfileInfoCard from "../Cards/ProfileInfoCard";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";

const Navbar = () => {
    const { user } = useContext(UserContext);

    return (
        <div className="bg-linear-to-b from-[#779bfd] to-[#e9eefb] py-3 w-full px-4 md:px-8 lg:px-16 border-b-2 border-gray-400 backdrop-blur-[5px] relative top-0 z-30">
            <div className="container mx-auto flex items-center justify-between gap-5">

                {/* Logo */}
                <Link to="/">
                    <h2 className="text-lg md:text-xl font-bold text-black leading-5 px-4">
                        Interview Prep AI
                    </h2>
                </Link>


                <ProfileInfoCard />
            </div>
        </div>
    );
};

export default Navbar;
