import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import { LuCircleAlert, LuListCollapse, LuSparkles } from "react-icons/lu";
import SpinnerLoader from "../../componenets/Loader/SpinnerLoader";
import { toast } from "react-hot-toast";
import DashboardLayout from "../../componenets/layouts/DashboardLayout";
import RoleInfoHeader from "./components/RoleInfoHeader"; // adjust if needed
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import QuestionCard from "../../componenets/Cards/QuestionCard";
import Drawer from "../../componenets/Drawer";
import SkeletonLoader from "../../componenets/Loader/SkeletonLoader";
import AIResponsePreview from "./components/AiResponsePreview";

const InterviewPrep = () => {
    const { sessionId } = useParams();
    const [sessionData, setSessionData] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [openLeanMoreDrawer, setOpenLeanMoreDrawer] = useState(false);
    const [explanation, setExplanation] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdateLoader, setIsUpdateLoader] = useState(false);
    const [explanationCache, setExplanationCache] = useState({});
    const abortControllerRef = useRef(null);

    const fetchSessionDetailsById = async () => {
        try {
            const response = await axiosInstance.get(
                API_PATHS.SESSION.GET_ONE(sessionId)
            );

            if (response.data && response.data.session) {
                setSessionData(response.data.session);
                // console.log("SessionData:", response.data.session);
            }

        } catch (error) {
            console.error("Error:", error);
        }
    };

    // Generate Concept Explanation with caching and timeout
    const generateConceptExplanation = async (question) => {
        // Check if explanation is already cached
        if (explanationCache[question]) {
            setErrorMsg("");
            setExplanation(explanationCache[question]);
            setIsLoading(false);
            setOpenLeanMoreDrawer(true);
            return;
        }

        try {
            setErrorMsg("");
            setExplanation(null);
            setIsLoading(true);
            setOpenLeanMoreDrawer(true);

            // Cancel any ongoing requests
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
            abortControllerRef.current = new AbortController();

            // Set a timeout for the request
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error('Request timeout')), 15000); // 15 second timeout
            });

            // Create the API request promise
            const apiPromise = axiosInstance.post(
                API_PATHS.AI.GENERATE_EXPLANATION,
                { question },
                { signal: abortControllerRef.current.signal }
            );

            // Race between API request and timeout
            const response = await Promise.race([apiPromise, timeoutPromise]);

            if (response.data) {
                setExplanation(response.data);
                // Cache the explanation
                setExplanationCache(prev => ({
                    ...prev,
                    [question]: response.data
                }));
            }
        } catch (error) {
            if (error.name === 'AbortError' || error.message === 'Request timeout') {
                setErrorMsg("Request is taking longer than expected. Please try again.");
            } else {
                setExplanation(null);
                setErrorMsg("Failed to generate explanation, Try again later");
            }
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Pin Question
    const toggleQuestionPinStatus = async (questionId) => {
        try {
            const response = await axiosInstance.post(API_PATHS.QUESTION.PIN(questionId)
            );
            console.log(response);
            if (response.data && response.data.question) {
                // toast.success ('Question Pinned Successfully')
                fetchSessionDetailsById();
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    // Add more questions to a session
    const uploadMoreQuestions = async () => {
        try {
            setIsUpdateLoader(true);

            // Call AI API to generate questions
            const aiResponse = await axiosInstance.post(
                API_PATHS.AI.GENERATE_QUESTIONS,
                {
                    role: sessionData?.role,
                    experience: sessionData?.experience,
                    topicsToFocus: sessionData?.topicsToFocus,
                    numberOfQuestions: 10,
                }
            );

            // Should be array like [{question, answer}, ...]
            const generatedQuestions = aiResponse.data;

            const response = await axiosInstance.post(
                API_PATHS.QUESTION.ADD_TO_SESSION,
                {
                    sessionId,
                    questions: generatedQuestions,
                }
            );
            if (response.data) {
                toast.success("Added More Q&A!!");
                fetchSessionDetailsById();
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("Something went wrong. Please try again.");
            }
        } finally {
            setIsUpdateLoader(false);
        }
    };


    useEffect(() => {
        if (sessionId) {
            fetchSessionDetailsById();
        }
        return () => {
            // Clean up any ongoing requests
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    // if (isLoading) return <SkeletonLoader />;

    return (
        <DashboardLayout>
            <div className="container mx-auto pt-4 pb-4">
                <RoleInfoHeader
                    isOpen={openLeanMoreDrawer}
                    role={sessionData?.role || ""}
                    topicsToFocus={sessionData?.topicsToFocus || ""}
                    experience={sessionData?.experience || "-"}
                    questions={sessionData?.questions?.length || "-"}
                    description={sessionData?.description || ""}
                    lastUpdated={
                        sessionData?.updatedAt
                            ? moment(sessionData.updatedAt).format("DD MMM YYYY")
                            : " "
                    }
                />
                <div className="container mx-auto pt-4 pb-4 px-4 md:px-0 ">
                    <h2 className="text-lg font-bold text-black underline ">Interview Q & A</h2>

                    <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
                        <div
                            className={`col-span-12 ${openLeanMoreDrawer ? "md:col-span-7" : "md:col-span-8"}`}
                        >
                            <AnimatePresence>
                                {sessionData?.questions?.map((data, index) => (
                                    <motion.div
                                        key={data._id || index}
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{
                                            duration: 0.4,
                                            type: "spring",
                                            stiffness: 100,
                                            delay: index * 0.1,
                                            damping: 15,
                                        }}
                                        layout
                                        layoutId={`question-${data._id || index}`}
                                    >
                                        <>
                                            <QuestionCard
                                                question={data?.question}
                                                answer={data?.answer}
                                                onLearnMore={() => generateConceptExplanation(data.question)}
                                                isPinned={data?.isPinned}
                                                onTogglePin={() => toggleQuestionPinStatus(data._id)}
                                            />
                                            {!isLoading &&
                                                sessionData?.questions?.length == index + 1 && (
                                                    <div className="flex items-center justify-center mt-5">
                                                        <button
                                                            className="flex items-center gap-3 text-sm text-white font-normal bg-black px-5 py-3 mr-2 rounded text-nowrap cursor-pointer"
                                                            disabled={isLoading || isUpdateLoader}
                                                            onClick={uploadMoreQuestions}
                                                        >
                                                            {isUpdateLoader ? (
                                                                <SpinnerLoader />
                                                            ) : (
                                                                <LuListCollapse className="text-lg" />
                                                            )}{" "}
                                                            Load More
                                                        </button>
                                                    </div>
                                                )
                                            }
                                        </>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                    <div>
                        <Drawer
                            isOpen={openLeanMoreDrawer}
                            onClose={() => {
                                setOpenLeanMoreDrawer(false);
                                setExplanation(null);
                                setErrorMsg("");
                            }}
                            title={!isLoading && explanation?.title}
                        >
                            {errorMsg && (
                                <p className="flex gap-2 text-sm text-amber-600 font-medium">
                                    <LuCircleAlert className="mt-1" />
                                    {errorMsg}
                                </p>
                            )}

                            <div className="w-full h-full">
                                {isLoading ? (
                                    <SkeletonLoader />
                                ) : (
                                    <div className="space-y-6">
                                        {/* Your drawer content goes here */}
                                        <div className="flex items-center gap-2 text-cyan-700">
                                            <LuSparkles className="animate-pulse" />
                                            <span className="font-medium">Generated Explanation</span>
                                        </div>
                                        <p className="text-gray-600 text-sm">
                                            {/* explanation content when loaded */}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {!isLoading && explanation && (
                                <AIResponsePreview content={explanation?.explanation} />
                            )}
                        </Drawer>
                    </div>

                </div>
            </div>
        </DashboardLayout>
    );
};

export default InterviewPrep;