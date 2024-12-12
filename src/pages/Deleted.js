import React, { useEffect, useState } from "react";
import EmailList from "../components/EmailList";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import MessageService from "../services/MessagesService";

const Deleted = ({emails, setEmails}) => {
    const [loading, setLoading] = useState(true); // Состояние для загрузки
    const [error, setError] = useState(null); // Состояние для ошибок

    // Загрузка данных с бэка
    useEffect(() => {
        const fetchEmails = async () => {
            setLoading(true);
            setError(null);

            try {

                const response = await MessageService.getDeletedMessages();
                const formattedEmails = response.map((msg) => ({
                    id: msg.id,
                    sender: msg.sender,
                    subject: msg.subject || "No Subject",
                    date: new Date(msg.sentAt).toLocaleString(), // Дата и время в локальном формате
                    body: msg.body,
                    recipient: msg.recipient,
                }));
                setEmails(formattedEmails);
            } catch (err) {
                console.error("Ошибка при загрузке сообщений:", err);
                setError("Failed to load emails. Please try again.");
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
                <Header emails={emails} setEmails={setEmails}/>
                <Sidebar />
                <div style={{ marginLeft: "300px" }}>
                    <h2>Inbox</h2>
                    <p>Loading emails...</p>
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
                    <h2>Inbox</h2>
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
                <h2>Deleted</h2>
                <EmailList emails={emails}/>
            </div>
        </>
    );
};

export default Deleted;
