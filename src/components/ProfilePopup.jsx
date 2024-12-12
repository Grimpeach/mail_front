import React from "react";
import { useUser } from "./hooks/useUser";
import {logout} from "./auth/service/UserService";
import {useNavigate} from "react-router-dom";

const ProfilePopup = ({ onClose }) => {
    // Получаем данные из localStorage
    const currentUserId = localStorage.getItem("currentUserId");
    const token = localStorage.getItem("authToken");
    const navigate = useNavigate();

    console.log("currentUserId:", currentUserId);
    console.log("token:", token);

    const { user, loading, error } = useUser(currentUserId, currentUserId, token);
    const handleLogout = () => {
        logout(token);
        localStorage.removeItem('authToken');
        navigate('/login');
    };
    // Если данные загружаются
    if (loading) {
        return <div>Loading...</div>;
    }

    // Если произошла ошибка
    if (error) {
        return (
            <div className="profile-popup">
                <p>{error}</p>
                <button className="close-btn" onClick={onClose}>
                    ×
                </button>
            </div>
        );
    }

    // Если данных нет
    if (!user) {
        return (
            <div className="profile-popup">
                <p>Не удалось загрузить данные пользователя.</p>
                <button className="close-btn" onClick={onClose}>
                    ×
                </button>
            </div>
        );
    }

    // Если данные успешно загружены
    return (
        <div className="profile-popup">
            <button className="close-btn" onClick={onClose}>
                ×
            </button>
            <div className="profile-header">
                <img
                    src={user.profilePictureUrl || "/resources/default_icon.png"}
                    alt="User Avatar"
                    className="avatar"
                />
                <h3 style={{ marginTop: "20px", margin: 0 }}>
                    Здравствуйте, {user.username}!
                </h3>
                <p style={{ margin: 0 }}>{user.email}</p>
            </div>
            <div className="profile-footer" style={{ textAlign: "center" }}>
                <button onClick={handleLogout}>Выйти</button>
            </div>
        </div>
    );
};

export default ProfilePopup;
