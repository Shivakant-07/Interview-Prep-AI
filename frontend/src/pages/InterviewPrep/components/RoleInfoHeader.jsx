import React from 'react';
import { getInitials } from '../../../utils/helper';

const RoleInfoHeader = ({
    isOpen,
    role,
    topicsToFocus,
    experience,
    questions,
    description,
    lastUpdated,
}) => {
    return (
        <div className='grid grid-cols-12 gap-1'>

            <div className={`col-span-12 ${isOpen ? "md:col-span-7" : "md:col-span-8"}`}>

                <div
                    className="bg-white border border-gray-300/40 rounded p-2 overflow-hidden cursor-pointer hover:shadow-xl shadow-gray-100 relative group "
                >
                    <div
                        className="rounded-lg p-4 cursor-pointer relative"
                        style={{
                            background: "linear-gradient(135deg, rgb(254, 249, 231) 0%, rgb(255, 253, 244) 100%)",
                        }}

                    >
                        <div className="flex items-start">
                            <div className="flex-shrink-0 w-12 h-12 bg-white rounded-md flex items-center justify-center mr-4 ">
                                <span className="text-lg font-semibold text-black">{getInitials(role)}</span>
                            </div>
                            <div className="flex-grow ml-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="text-[17px] font-medium">{role}</h2>
                                        <p className="text-xs text-medium text-gray-900">
                                            {topicsToFocus}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="px-3 pb-3">
                        <div className="flex items-center gap-3 mt-4 flex-wrap">
                            <div className="text-[10px] font-medium text-black px-3 py-1 border-[0.5px] border-gray-900 rounded-full ">
                                Experience: {experience} {experience === 1 ? "Year" : "Years"}
                            </div>
                            <div className="text-[10px] font-medium text-black px-3 py-1 border-[0.5px] border-gray-900 rounded-full">
                                {questions} Q&A
                            </div>
                            <div className="text-[10px] font-medium text-black px-3 py-1 border-[0.5px] border-gray-900 rounded-full">
                                Last Updated: {lastUpdated}
                            </div>
                        </div>

                        <p className="text-[12px] text-gray-500 font-medium line-clamp-2 mt-3">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

    // return (
    //     <div className="bg-white relative">
    //         <div className="container mx-auto px-10 md:px-0">
    //             <div className="h-[200px] flex flex-col justify-center relative z-10 ">
    //                 <div className="bg-white text-black rounded-xl p-2 overflow-hidden cursor-pointer hover:shadow-xl shadow-gray-100 relative group ">
    //                     <div className="flex-grow">
    //                         <div className="flex justify-between items-start">
    //                             <div>
    //                                 <h2 className="text-3xl font-semibold">{role}</h2>
    //                                 <p className="text-sm text-medium text-gray-900 mt-1">
    //                                     {topicsToFocus}
    //                                 </p>
    //                             </div>
    //                         </div>
    //                     </div>


    //                     <div className="flex items-center gap-3 mt-4 flex-wrap">
    //                         <div className="text-[10px] font-medium text-black px-3 py-1 border-[0.5px] border-gray-900 rounded-full ">
    //                             Experience: {experience} {experience === 1 ? "Year" : "Years"}
    //                         </div>
    //                         <div className="text-[10px] font-medium text-black px-3 py-1 border-[0.5px] border-gray-900 rounded-full">
    //                             {questions} Q&A
    //                         </div>
    //                         <div className="text-[10px] font-medium text-black px-3 py-1 border-[0.5px] border-gray-900 rounded-full">
    //                             Last Updated: {lastUpdated}
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // );
};

export default RoleInfoHeader;
