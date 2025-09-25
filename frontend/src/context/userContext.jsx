import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance.js";
import { API_PATHS } from "../utils/apiPaths.js";

// Create User Context
export const UserContext = createContext();

// Context Provider Component
const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Loading while fetching profile

    useEffect(() => {
        const accessToken = localStorage.getItem("token");
        if (!accessToken || user) {
            setLoading(false);
            return;
        }

        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
                setUser(response.data);
            } catch (error) {
                console.error("User not authenticated", error);
                clearUser();
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    // Update user and save token
    const updateUser = (userData) => {
        setUser(userData);
        if (userData.token) {
            localStorage.setItem("token", userData.token);
        }
        setLoading(false);
    };

    // Clear user and token
    const clearUser = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Export
export default UserProvider;
