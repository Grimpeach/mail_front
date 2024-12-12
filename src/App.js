import React, {useState} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Inbox from "./pages/Inbox";
import Sent from "./pages/Sent";
import Deleted from "./pages/Deleted";
import Write from "./pages/Write";
import {Login} from "./components/auth/login";
import MessageContent from "./pages/MessageContent";
import "./App.css";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const App = () => {
    const [emails, setEmails] = useState([]);
    return (
        <Router>
            <div className="app">

                <div className="app-body">
                    <div className="content">
                        <Routes>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/" element={
                                <ProtectedRoute>
                                    <Inbox/>
                                </ProtectedRoute>
                            }/>
                            <Route path="/inbox" element={
                                <ProtectedRoute>
                                    <Inbox emails={emails} setEmails={setEmails}/>
                                </ProtectedRoute>
                            }/>
                            <Route path="/sent" element={
                                <ProtectedRoute>
                                    <Sent emails={emails} setEmails={setEmails}/>
                                </ProtectedRoute>
                            }/>
                            <Route path="/drafts" element={
                                <ProtectedRoute>
                                    <Deleted emails={emails} setEmails={setEmails}/>
                                </ProtectedRoute>
                            }/>
                            <Route path="/write" element={
                                <ProtectedRoute>
                                    <Write/>
                                </ProtectedRoute>
                            }/>
                            <Route path="/message/:id" element={
                                <ProtectedRoute>
                                    <MessageContent/>
                                </ProtectedRoute>
                            }/>
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
};

export default App;
