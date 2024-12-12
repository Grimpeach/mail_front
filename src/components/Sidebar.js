import React from 'react';
import '../styles/Sidebar.css';
import { NavLink, useNavigate } from "react-router-dom";
import { FaInbox, FaStar, FaPaperPlane, FaArchive, FaPlus } from "react-icons/fa";

const Sidebar = () => {
    const navigate = useNavigate();

    const handlewrite = () => {
        navigate("/write");
    };
    return (
        <div className="sidebar">
            <button className="write-button" onClick={handlewrite}>
                <FaPlus className="icon"/> Write
            </button>
            <ul>
                <li>
                    <NavLink to="/inbox" activeClassName="active-link">
                        <FaInbox className="icon"/> Inbox
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/sent" activeClassName="active-link">
                        <FaPaperPlane className="icon"/> Sent
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/drafts" activeClassName="active-link">
                        <FaArchive className="icon"/> Deleted
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
