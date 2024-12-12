import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import MessageService from "../services/MessagesService";

const Write = () => {
    const [to, setTo] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [isSending, setIsSending] = useState(false); // Для отображения состояния отправки
    const [error, setError] = useState(null); // Для обработки ошибок
    const currentUserId = localStorage.getItem("currentUserId");
    const currentUserEmail = localStorage.getItem("currentUserEmail");
    const handleSend = async () => {
        setIsSending(true);
        setError(null);

        try {
            // Создаём объект сообщения
            const newMessage = {
                sender: currentUserEmail,
                recipient: to,
                subject: subject || "No Subject",
                body: message,
            };

            // Отправка сообщения через сервис
            const sentMessage = await MessageService.sendMessage(newMessage);

            alert(`Message sent successfully! ID: ${sentMessage.id}`);
            setTo("");
            setSubject("");
            setMessage("");
        } catch (err) {
            console.error("Ошибка при отправке сообщения:", err);
            setError("Failed to send the message. Please try again.");
        } finally {
            setIsSending(false);
        }
    };

    return (
        <>
            <Header/>
            <Sidebar />
            <div style={{ marginLeft: "300px", padding: "20px" }}>
                <h2>Write Message</h2>
                <form className="write-form" onSubmit={(e) => e.preventDefault()}>
                    <label>
                        To:
                        <input
                            type="email"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            placeholder="Recipient email"
                            required
                        />
                    </label>
                    <label>
                        Subject:
                        <input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Subject"
                        />
                    </label>
                    <label>
                        Message:
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Write your message here..."
                            required
                        />
                    </label>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <button type="button" onClick={handleSend} disabled={isSending}>
                        {isSending ? "Sending..." : "Send"}
                    </button>
                </form>
            </div>
        </>
    );
};

export default Write;
