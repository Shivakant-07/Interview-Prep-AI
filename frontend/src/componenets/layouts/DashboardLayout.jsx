import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";

const DashboardLayout = ({ children }) => {
    const { user } = useContext(UserContext);
    return (
        <div>
            <Navbar />
            {user && <div className="px-4 md:px-8 lg:px-16">{children}</div>}
        </div>
    );

};

export default DashboardLayout