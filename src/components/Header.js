import React, {useEffect, useState} from "react";
import "../styles/Header.css";
import { FaSearch, FaCog, FaUserCircle } from "react-icons/fa";
import {useUser} from "./hooks/useUser";
import ProfilePopup from "./ProfilePopup";
import {logout} from "./auth/service/UserService";
import {data, Navigate, useNavigate} from 'react-router-dom';
import axios from "axios";
import MessageService from "../services/MessagesService";
const Header = ({emails, setEmails}) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [search, setSearch] = useState('');
    const token = localStorage.getItem('authToken');
    const toggleProfile = () => {
        setIsProfileOpen((prev) => !prev);
    };
    const navigate = useNavigate();

    const handleSearch = async (event) => {
        event.preventDefault();
        try {
            const response = await MessageService.getSearch(search);
            const formattedEmails = response.map((msg) => ({
                id: msg.id,
                recipient: msg.recipient,
                subject: msg.subject || "No Subject",
                date: new Date(msg.sentAt).toLocaleString(),
                body: msg.body,
                sender: msg.sender,
            }));

            setEmails(formattedEmails);
        } catch (error) {
            console.error('Ошибка при поиске треков:', error);
        }
    };

    return (
        <header className="header">
            <div className="header-left">
                <h1>Grimail</h1>
            </div>
            <div className="header-center">
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search..."
                    />
                </form>
                <FaSearch className="search-icon"/>
            </div>
            <div className="header-right">
                <div className="profile-container">
                    <FaUserCircle className="icon" onClick={toggleProfile}/>
                    {isProfileOpen && (
                        <ProfilePopup onClose={() => setIsProfileOpen(false)}/>
                    )}
                </div>
            </div>
        </header>
    );
};



export default Header;
