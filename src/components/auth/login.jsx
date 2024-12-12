import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Login.css";
import { Register } from "./Register";

export const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const [register, setRegister] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const response = await fetch(
            `${process.env.REACT_APP_API_BASE_URL}/users/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            }
        );

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("authToken", data.token);
            localStorage.setItem("currentUserId", data.user.userId);
            localStorage.setItem("currentUserEmail", data.user.email);
            navigate("/inbox");
        } else {
            console.error("Ошибка при входе");
        }
    };

    return (
        <div style={{ background: "white" }}>
            {register === false ? (
                <div className="auth-container">
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <input
                            className="auth-input"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                        />
                        <input
                            className="auth-input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                        <button type="submit" className="login-btn">
                            Login
                        </button>
                        <button
                            type="button"
                            className="register-btn"
                            onClick={() => setRegister(true)}
                        >
                            Register
                        </button>
                    </form>
                </div>
            ) : (
                <Register register={register} setRegister={setRegister} />
            )}
        </div>
    );
};
