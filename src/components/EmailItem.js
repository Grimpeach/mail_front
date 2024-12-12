import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/EmailItem.css";
import { FaStar, FaTrash } from "react-icons/fa";
import MessageService from "../services/MessagesService";


function getURLWithoutVar(key) {
    var url = '';
    // eslint-disable-next-line no-restricted-globals
    var vars = location.search.substr(1).split('&').reduce(function(res, a) {
        var t = a.split('=');
        if (key != decodeURIComponent(t[0])) url += '&' + a;
    }, {});
    // eslint-disable-next-line no-restricted-globals
    return url != '' ? location.origin + location.pathname + '?' + url.substr(1) : location.href;
}
const EmailItem = ({email})   => {
    var url = getURLWithoutVar('test');
    console.log(url);
    const navigate = useNavigate();
    const currentUserEmail = localStorage.getItem("currentUserEmail");
    const handleOpenEmail = () => {
        navigate(`/message/${email.id}`); // Переход на страницу с содержимым сообщения
    };

    const handleDelete = async () => {

        const newMessage = {
            sender: email.sender,
            recipient: email.recipient,
            body: email.body|| "No Subject",
            subject: email.subject,
            id: email.id,
        };
        try {
            const deleteMessage = await MessageService.markDeleteMessage(newMessage);
        } catch (err) {
            console.error("Ошибка при отправке сообщения:", err);
        }
    };

    return (
        <div className="email-item">
            <input type="checkbox" />
            <FaStar className="star-icon" />
            <span className="email-sender" onClick={handleOpenEmail}>{url == "http://localhost:3000/sent" ? "dasdsad" : email.sender}</span>
            <span className="email-subject" onClick={handleOpenEmail}>{email.subject}</span>
            <span className="email-date" onClick={handleOpenEmail}>{new Date(email.date).toLocaleString()}</span>
            <FaTrash className="delete-icon" onClick={handleDelete}/>
        </div>
    );
};

export default EmailItem;
