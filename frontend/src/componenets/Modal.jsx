import React from 'react';

const Modal = ({ children, isOpen, onClose, title, hideHeader }) => {
    if (!isOpen) return null;

    return <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black/40">
        {/* Modal Content */}
        <div className="relative flex flex-col bg-white shadow-lg rounded-lg overflow-hidden max-h-[90vh] w-[90vw] md:w-[36vw]"
        >
            {/* Modal Header */}
            {!hideHeader && (
                <div className="flex items-center justify-between p-4 border-b border-gray-200 ">
                    <h3 className="md:text-lg font-medium text-gray-900">{title}</h3>
                </div>
            )}
            <button
                type="button"
                className="bg-gray-300 text-black hover:bg-black hover:text-white rounded-lg text-sm w-8 h-8 flex justify-center items-center absolute top-3.5 right-3.5 cursor-pointer"
                onClick={onClose}
            >
                <svg
                    className="w-3.5 h-3.5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </button>

            {/* Modal Body (Scrollable) */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {children}
            </div>
        </div>
    </div>
};
export default Modal