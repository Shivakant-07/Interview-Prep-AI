import React from "react";

const SpinnerLoader = ({ size = 20 }) => {
    return (
        <svg
            className="animate-spin"
            style={{ width: size, height: size }}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
        >
            <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
    );
};

export default SpinnerLoader;
