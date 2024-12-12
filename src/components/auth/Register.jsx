import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Интерфейс для ошибок
interface Errors {
    username?: string;
    passwordHash?: string;
    email?: string;
    lastName?: string;

    [key: string]: string | undefined; // Для динамических ключей
}


// Интерфейс для пропсов компонента
interface RegisterProps {
    register: boolean;
    setRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Register: React.FC<RegisterProps> = ({ register, setRegister }) => {
    const [username, setUsername] = useState("");
    const [passwordHash, setPasswordHash] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});


    // Валидация формы
    const validate = (): boolean => {
        const tempErrors: Errors = {};

        if (!username) tempErrors.username = "Username is required";
        else if (username.length < 3 || username.length > 20)
            tempErrors.username = "Username must contain 3-20 characters";

        if (!passwordHash) tempErrors.passwordHash = "Password is required";
        else if (passwordHash.length < 6 || passwordHash.length > 50)
            tempErrors.passwordHash = "Password must contain 6-50 characters";

        if (!email) tempErrors.email = "Email address is required";
        else if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/))
            tempErrors.email = "Invalid email address";


        setErrors(tempErrors); // Установка ошибок
        return Object.keys(tempErrors).length === 0; // Если ошибок нет, вернуть true
    };

    // Обработка отправки формы
    const handleSubmitRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validate()) return;

        try {
            const registrationResponse = await fetch(
                `${process.env.REACT_APP_API_BASE_URL}/users/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username,
                        passwordHash,
                        email,
                    }),
                }
            );

            if (registrationResponse.ok) {
                const data = await registrationResponse.json();

                // Сохранение токена в localStorage
                localStorage.setItem("authToken", data.token);
                localStorage.setItem("currentUserId", data.user.userId);
                localStorage.setItem("currentUserEmail", data.user.email);
                // Переход на страницу профиля
                navigate("/inbox");
            } else {
                const errorResponse = await registrationResponse.json();
                setErrors({ form: errorResponse.message });
            }
        } catch (error) {
            console.error("Ошибка при регистрации:", error);
            setErrors({ form: "An unexpected error occurred. Please try again." });
        }
    };

    return (
        <div className="auth-container">
            {register && (
                <form onSubmit={handleSubmitRegister} className="auth-form">
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
                        value={passwordHash}
                        onChange={(e) => setPasswordHash(e.target.value)}
                        placeholder="Password"
                    />
                    <input
                        className="auth-input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                    <button type="submit" className="register-btn">
                        Register
                    </button>
                    {Object.keys(errors).length > 0 && (
                        <div className="form-errors">
                            {Object.keys(errors).map((key) => (
                                <p key={key}>{errors[key]}</p>
                            ))}
                        </div>
                    )}
                    <a
                        className="back-to-login"
                        onClick={() => setRegister(false)}
                        style={{ cursor: "pointer" }}
                    >
                        Already have an account?
                    </a>
                </form>
            )}
        </div>
    );
};
