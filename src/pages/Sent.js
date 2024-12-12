import React, { useEffect, useState } from "react";
import EmailList from "../components/EmailList";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import MessageService from "../services/MessagesService";

const Sent = ({emails, setEmails}) => {
    const [loading, setLoading] = useState(true); // Состояние для загрузки
    const [error, setError] = useState(null); // Состояние для ошибок

    // Загрузка данных с бэка
    useEffect(() => {
        const fetchEmails = async () => {
            setLoading(true);
            setError(null);

            try {
                // Получение сообщений отправленных текущим пользователем
                const currentUserId = localStorage.getItem("currentUserId");
                if (!currentUserId) {
                    throw new Error("User not authenticated.");
                }

                const response = await MessageService.getMessagesFromSender(currentUserId);

                const formattedEmails = response.map((msg) => ({
                    id: msg.id,
                    recipient: msg.recipient,
                    subject: msg.subject || "No Subject",
                    date: new Date(msg.sentAt).toLocaleString(),
                    body: msg.body,
                    sender: msg.sender,
                }));
                setEmails(formattedEmails);
            } catch (err) {
                console.error("Ошибка при загрузке отправленных сообщений:", err);
                setError("Failed to load sent emails. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchEmails();
    }, []); // Выполняется при первом рендере

    // Отображение компонентов в зависимости от состояния
    if (loading) {
        return (
            <>
                <Header setMessages={setEmails}/>
                <Sidebar />
                <div style={{ marginLeft: "300px" }}>
                    <h2>Sent</h2>
                    <p>Loading sent emails...</p>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Header emails={emails} setEmails={setEmails}/>
                <Sidebar />
                <div style={{ marginLeft: "300px" }}>
                    <h2>Sent</h2>
                    <p style={{ color: "red" }}>{error}</p>
                </div>
            </>
        );
    }

    return (
        <>
            <Header emails={emails} setEmails={setEmails}/>
            <Sidebar />
            <div style={{ marginLeft: "300px" }}>
                <h2>Sent</h2>
                <EmailList emails={emails}/>
            </div>
        </>
    );
};

export default Sent;
