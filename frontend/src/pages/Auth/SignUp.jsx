import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../componenets/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../componenets/Inputs/ProfilePhotoSelector";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPaths.js";
import uploadImage from "../../utils/uploadImage.js";
import googleIcon from "../../assets/google.png";
import toast from "react-hot-toast";

const SignUp = ({ setCurrentPage }) => {
    const [profilePic, setProfilePic] = useState(null);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    const { updateUser } = useContext(UserContext);

    const navigate = useNavigate();

    // Handle SignUp Form Submit
    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);

        let profileImageUrl = "";

        if (!fullName) {
            setError("Please enter full name.");
            return;
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        if (!password) {
            setError("Please enter the password");
            return;
        }

        setError("");
        //SignUp API Call
        try {
            // Upload image if present
            if (profilePic) {
                const imgUploadRes = await uploadImage(profilePic);
                profileImageUrl = imgUploadRes.imageUrl || "";
            }
            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
                name: fullName,
                email,
                password,
                profileImageUrl,
            });
            const { token } = response.data;
            if (token) {
                localStorage.setItem("token", token);
                updateUser(response.data);
                navigate("/dashboard");
                toast.success("SignUp Successfully!");
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("Something went wrong. Please try again.");
            }
        } finally {
            setLoading(false); // stop loading always
        }
    };


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

    return <div className="w-[90vw] md:w-[33vw] p-5 flex flex-col justify-center">
        <h3 className="text-lg font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-2">
            Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignUp}>

            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

            <div className="grid grid-cols-1 md:grid-cols-1 gap-0">
                <Input
                    value={fullName}
                    onChange={({ target }) => setFullName(target.value)}
                    label="Full Name"
                    placeholder="sk"
                    type="text"
                />
                <Input
                    value={email}
                    onChange={({ target }) => setEmail(target.value)}
                    label="Email Address"
                    placeholder="sk@example.com"
                />
                <Input
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                    label="Password"
                    placeholder="Min 8 Characters ( eg. test@123 )"
                    type="password"
                />
            </div>

            {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

            <button type="submit" className="btn-primary">
                {loading ? "Signing Up..." : "SIGN UP"}
            </button>

        </form>
        <div className=" flex items-center justify-center p-1.5">or</div>

        <button
            className="w-full h-10 rounded-md border-l-1 border-t-1 border-b-2 border-r-2 border-gray-200  bg-white text-[16px] font-medium mb-5 text-[#2c444e] cursor-pointer flex items-center justify-center relative"
            onClick={googleAuth}>
            <img src={googleIcon} alt="google icon" className="w-5 h-5 mr-2 object-contain" />
            <span>Sign Up with Google</span>
        </button>
        <p className="text-[15px] ☐ text-slate-800 mt-3">
            Already an account?{" "}
            <button
                type="button"
                className="font-medium text-primary underline cursor-pointer"
                onClick={() => setCurrentPage("login")}
            >
                Login
            </button>
        </p>
    </div>

};

export default SignUp