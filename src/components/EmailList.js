import React from 'react';
import EmailItem from './EmailItem';
import '../styles/EmailList.css';
import { FaRedo, FaFilter, FaSort } from "react-icons/fa";

const EmailList = ({ emails}) => {
    return (
        <div className="email-list-container">
            <div className="email-list">
                {emails.map((email) => (
                    <EmailItem key={email.id} email={email}/>
                ))}
            </div>
        </div>
    );
};

export default EmailList;