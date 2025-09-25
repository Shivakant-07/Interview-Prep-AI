import React from 'react';

const SkeletonLoader = () => {
    return (
        <div
            className={`fixed top-[64px] right-0 z-40 h-[calc(100dvh-64px)] p-4 overflow-y-auto transition-transform duration-300 bg-white w-full md:w-[40vw] shadow-2xl shadow-cyan-800/10 border-r border-l-gray-800`}
            tabIndex="-1"
            aria-labelledby="drawer-right-label"
        >
            <div className="space-y-10">

                <div role="status" className="animate-pulse space-y-4 max-w-3xl">

                    <div className="h-6 bg-gray-100 rounded-md dark:bg-gray-400 w-1/2"></div>
                    <div className="space-y-2">
                        <div className="h-3 bg-gray-100 rounded dark:bg-gray-400 w-full"></div>
                        <div className="h-3 bg-gray-100 rounded dark:bg-gray-400 w-11/12"></div>
                        <div className="h-3 bg-gray-100 rounded dark:bg-gray-400 w-10/12"></div>
                        <div className="h-3 bg-gray-100 rounded dark:bg-gray-400 w-9/12"></div>
                    </div>

                    <div className="bg-gray-100 dark:bg-gray-400 rounded p-4 space-y-2">
                        <div className="h-2.5 bg-gray-300 rounded w-3/4"></div>
                        <div className="h-2.5 bg-gray-300 rounded w-2/3"></div>
                        <div className="h-2.5 bg-gray-300 rounded w-1/2"></div>
                    </div>
                </div>

                <div role="status" className="animate-pulse space-y-4 max-w-3xl mt-10">

                    <div className="h-4 bg-gray-100 rounded-md dark:bg-gray-400 w-1/2"></div>

                    <div className="space-y-2">
                        <div className="h-3 bg-gray-100 rounded dark:bg-gray-400 w-full"></div>
                        <div className="h-3 bg-gray-100 rounded dark:bg-gray-400 w-11/12"></div>
                        <div className="h-3 bg-gray-100 rounded dark:bg-gray-400 w-10/12"></div>
                        <div className="h-3 bg-gray-100 rounded dark:bg-gray-400 w-9/12"></div>
                    </div>

                    <div className="space-y-2">
                        <div className="h-3 bg-gray-100 rounded dark:bg-gray-400 w-full"></div>
                        <div className="h-3 bg-gray-100 rounded dark:bg-gray-400 w-11/12"></div>
                        <div className="h-3 bg-gray-100 rounded dark:bg-gray-400 w-10/12"></div>
                        <div className="h-3 bg-gray-100 rounded dark:bg-gray-400 w-9/12"></div>
                    </div>

                    <div className="bg-gray-100 dark:bg-gray-400 rounded p-4 space-y-2">
                        <div className="h-2.5 bg-gray-300 rounded w-3/4"></div>
                        <div className="h-2.5 bg-gray-300 rounded w-2/3"></div>
                    </div>

                    <div className="h-4 bg-gray-100 rounded-md dark:bg-gray-400 w-1/2 mt-8"></div>

                    <div className="space-y-2">
                        <div className="h-3 bg-gray-100 rounded dark:bg-gray-400 w-full"></div>
                        <div className="h-3 bg-gray-100 rounded dark:bg-gray-400 w-11/12"></div>
                        <div className="h-3 bg-gray-100 rounded dark:bg-gray-400 w-10/12"></div>
                        <div className="h-3 bg-gray-100 rounded dark:bg-gray-400 w-9/12"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonLoader;
