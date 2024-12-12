import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import MessageService from "../services/MessagesService";

const MessageContent = () => {
    const { id } = useParams(); // Получаем ID сообщения из параметров маршрута
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMessage = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await MessageService.getMessageById(id);
                setMessage(response);
            } catch (err) {
                console.error("Ошибка при загрузке сообщения:", err);
                setError("Failed to load the message. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchMessage();
    }, [id]);

    if (loading) {
        return (
            <>
                <Header/>
                <Sidebar />
                <div style={{ marginLeft: "300px" }}>
                    <h2>Message Content</h2>
                    <p>Loading message...</p>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Header/>
                <Sidebar />
                <div style={{ marginLeft: "300px" }}>
                    <h2>Message Content</h2>
                    <p style={{ color: "red" }}>{error}</p>
                </div>
            </>
        );
    }

    return (
        <>
            <Header/>
            <Sidebar />
            <div style={{ marginLeft: "300px", padding: "20px" }}>
                <h2>{message.subject || "No Subject"}</h2>
                <p><strong>From:</strong> {message.sender}</p>
                <p><strong>To:</strong> {message.recipient}</p>
                <p><strong>Date:</strong> {new Date(message.sentAt).toLocaleString()}</p>
                <hr />
                <p>{message.body}</p>
            </div>
        </>
    );
};

export default MessageContent;
