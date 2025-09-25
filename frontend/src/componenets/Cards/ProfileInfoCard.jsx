import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import toast from "react-hot-toast";
import { FaSignOutAlt, FaTachometerAlt, FaHome } from "react-icons/fa";
import { getInitials } from "../../utils/helper";

const ProfileInfoCard = () => {
    const { user, clearUser } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate("/");
        toast.success("Successfully logged out!");
    };

    if (!user) return null;

    return (
        <div className="flex items-center gap-4 bg-white rounded-full px-4 py-2 shadow-sm hover:shadow-md transition">
            {/* Nav Buttons */}
            <div className="flex items-center gap-3">
                {location.pathname !== "/" && (
                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center gap-1 text-sm pr-3 border-r border-gray-300 text-green-600 hover:text-green-700 transition"
                    >
                        <FaHome /> Home
                    </button>
                )}

                {location.pathname !== "/dashboard" && (
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="flex items-center gap-1 text-sm pr-3 border-r border-gray-300 text-amber-600 hover:text-amber-700 transition"
                    >
                        <FaTachometerAlt /> Dashboard
                    </button>
                )}
            </div>

            {/* Avatar */}
            {user?.profileImageUrl ? (
                <img
                    src={user.profileImageUrl}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border border-gray-300 object-cover"
                />
            ) : (
                <div className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 bg-gray-200 text-gray-700 font-bold">
                    {getInitials(user?.name)}
                </div>
            )}

            {/* User Info */}
            <div className="flex flex-col leading-tight">
                <span className="font-semibold text-gray-800 text-sm">
                    {user?.name || "User"}
                </span>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700 transition"
                >
                    <FaSignOutAlt /> Logout
                </button>
            </div>
        </div>
    );
};

export default ProfileInfoCard;
