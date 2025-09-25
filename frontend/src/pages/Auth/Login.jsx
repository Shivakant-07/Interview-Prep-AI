import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Input from "../../componenets/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPaths.js";
import googleIcon from "../../assets/google.png";
import toast from "react-hot-toast";
import axios from "axios";



const Login = ({ setCurrentPage }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const [user, setUser] = useState(null);

    const { updateUser } = useContext(UserContext);

    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        if (token) {
            localStorage.setItem("token", token);

            // Get user profile using the token
            axiosInstance.get(API_PATHS.AUTH.GET_PROFILE, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(res => {
                    updateUser({ ...res.data, token });
                    navigate("/dashboard");
                })
                .catch(err => {
                    console.error("Profile fetch failed", err);
                });
        }
        // Existing error handling
        const errorParam = params.get("error");
        if (errorParam === "account-exists") {
            setError("An account with this email already exists. Please login using email & password.");
        }
    }, [location]);


    const googleAuth = () => {
        window.open(
            `${import.meta.env.VITE_API_URL}/api/auth/google`,
            "_self"
        );

    };



    // Handle Login Form Submit
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        if (!password) {
            setError("Please enter the password");
            return;
        }
        setError("");

        //Login API Call
        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
                email,
                password,
            });
            const { token } = response.data;
            if (token) {
                localStorage.setItem("token", token);
                updateUser(response.data);
                navigate("/dashboard");
                toast.success("Login Successfully!");
            } else {
                setError("Login failed. No token received.");
            }

        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("Something went wrong. Please try again.");
            }
        };
    };


    return (
        <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-black">Welcome Back</h3>
            <p className="text-xs text-slate-700 mt-[5px] mb-6">
                Please enter your details to log in
            </p>


            <form onSubmit={handleLogin}>
                <Input
                    value={email}
                    onChange={({ target }) => setEmail(target.value)}
                    label="Email Address"
                    placeholder="sk@example.com"
                    type="text"
                />
                <Input
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                    label="Password"
                    placeholder="Min 8 Characters ( eg. test@123 )"
                    type="password"
                />

                {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

                <button type="submit" className="btn-primary">
                    LOGIN
                </button>
            </form>

            <div className=" flex items-center justify-center p-1.5">or</div>

            <button
                className="w-full h-10 rounded-md border-l-1 border-t-1 border-b-2 border-r-2 border-gray-200  bg-white text-[16px] font-medium mb-5 text-[#2c444e] cursor-pointer flex items-center justify-center relative"
                onClick={googleAuth}

            >
                <img src={googleIcon} alt="google icon" className="w-5 h-5 mr-2 object-contain" />
                <span>Login in with Google</span>
            </button>


            <p className="text-[13px] text-slate-800 mt-3">
                Don't have an account?{" "}
                <button
                    type="button"
                    className="font-medium text-primary underline cursor-pointer"
                    onClick={() => setCurrentPage("signup")}
                >

                    SignUp
                </button>
            </p>
        </div>
    );
};
export default Login