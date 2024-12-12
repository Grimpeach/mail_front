import React from 'react';
import '../styles/styles.css';
const EmailView = ({ email }) => {
    return (
        <div className="email-view">
            <h2>{email.subject}</h2>
            <h4>From: {email.sender}</h4>
            <p>{email.body}</p>
            <span>{email.date}</span>
        </div>
    );
};

export default EmailView;
