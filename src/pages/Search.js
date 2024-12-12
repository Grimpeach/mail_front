import React, { useEffect, useState } from "react";
import EmailList from "../components/EmailList";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import MessageService from "../services/MessagesService";

const Search = ({emails, query}) => {
    const [error, setError] = useState(null); // Состояние для ошибок

    return (
        <>
            <Header emails={emails}/>
            <Sidebar />
            <div style={{ marginLeft: "300px" }}>
                <h2>Search results for "{query}":</h2>
                <EmailList emails={emails}/>
            </div>
        </>
    );
};

export default Search;
