import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../componenets/Inputs/Input"; // adjust the import if needed
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import SpinnerLoader from "../../componenets/Loader/SpinnerLoader";



const CreateSessionForm = () => {
    const [formData, setFormData] = useState({
        role: "",
        experience: "",
        topicsToFocus: "",
        description: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (key, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    const handleCreateSession = async (e) => {
        e.preventDefault();
        const { role, experience, topicsToFocus } = formData;

        if (!role || !experience || !topicsToFocus) {
            setError("Please fill all the required fields.");
            return;
        }

        setError("");
        setIsLoading(true);
        try {
            const aiResponse = await axiosInstance.post(
                API_PATHS.AI.GENERATE_QUESTIONS,
                {
                    role,
                    experience,
                    topicsToFocus,
                    numberOfQuestions: 10,
                }
            );

            // Should be an array like [{ question, answer }, ...]
            const generatedQuestions = aiResponse.data;

            const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
                ...formData,
                questions: generatedQuestions,
            });

            if (response.data?.session?._id) {
                navigate(`/interview-prep/${response.data?.session?._id}`);
            }
        } catch (error) {
            if (error.response && error.response.data?.message) {
                setError(error.response.data.message);
            } else {
                setError("Something went wrong. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-[90vw] md:w-[35vw] p-7 flex flex-col justify-center ">
            <h3 className="text-lg font-semibold text-black">
                Start a New Interview Journey
            </h3>
            <p className="text-sm text-slate-700 mt-[5px] mb-3">
                Fill out a few quick details and unlock your personalized set of interview questions!
            </p>

            <form onSubmit={handleCreateSession} className="flex flex-col gap-3">
                {/* Role */}
                <Input
                    value={formData.role}
                    onChange={({ target }) => handleChange("role", target.value)}
                    label="Target Role"
                    placeholder="e.g., Frontend Developer"
                    type="text"
                    list="role-suggestions"
                />
                <datalist id="role-suggestions">
                    <option value="Frontend Developer" />
                    <option value="Backend Developer" />
                    <option value="Full Stack Developer" />
                    <option value="Data Scientist" />
                    <option value="Machine Learning Engineer" />
                    <option value="DevOps Engineer" />
                    <option value="Cloud Engineer" />
                    <option value="Mobile App Developer" />
                </datalist>

                {/* Experience */}
                <Input
                    value={formData.experience}
                    onChange={({ target }) => handleChange("experience", target.value)}
                    label="Years of Experience"
                    placeholder="e.g., 1, 3, 5+"
                    type="number"
                    list="experience-suggestions"
                />
                <datalist id="experience-suggestions">
                    <option value="0" />
                    <option value="1" />
                    <option value="2" />
                    <option value="3" />
                    <option value="4" />
                    <option value="5" />
                </datalist>

                {/* Topics */}
                <Input
                    value={formData.topicsToFocus}
                    onChange={({ target }) => handleChange("topicsToFocus", target.value)}
                    label="Topics to Focus On"
                    placeholder="e.g., React, Node.js"
                    type="text"
                    list="topicsToFocus-suggestions"
                />
                <datalist id="topicsToFocus-suggestions">~
                    <option value="JavaScript, HTML, CSS" />
                    <option value="React.js, Node.js" />
                    <option value="MongoDB, Express.js, Node.js, React.js " />
                    <option value="Computer Networks" />
                    <option value="System Design" />
                    <option value="Data Structures & Algorithms" />
                    <option value="API Development" />
                    <option value="Testing & Debugging" />
                </datalist>


                {/* Description */}
                <Input
                    value={formData.description}
                    onChange={({ target }) => handleChange("description", target.value)}
                    label="Description"
                    placeholder="Any specific goals or notes"
                    type="text"
                    list="description-suggestions"
                />
                <datalist id="description-suggestions">
                    <option value="Strengthen web fundamentals and UI skills." />
                    <option value="Practice React + Node integration." />
                    <option value="Build full MERN stack projects." />
                    <option value="Revise computer networks basics." />
                    <option value="Practice system design patterns." />
                    <option value="Solve DSA coding problems." />
                    <option value="Learn API design & auth flows." />
                    <option value="Improve debugging & testing." />
                    <option value="Work on ML models & pipelines." />
                </datalist>

                {error && <p className="text-red-500 text-sm pb-2.5">{error}</p>}

                <button
                    type="submit"
                    className="btn-primary w-full mt-2"
                    disabled={isLoading}
                >
                    {isLoading && <SpinnerLoader />} Create Session
                </button>
            </form>
        </div>
    );
};

export default CreateSessionForm;
