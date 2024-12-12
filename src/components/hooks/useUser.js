import { useState, useEffect } from 'react';

export const useUser = (userId, currentUserId, token) => {
    const [user, setUser] = useState(null); // Начальное значение null
    const [loading, setLoading] = useState(true); // Добавляем состояние загрузки
    const [error, setError] = useState(null); // Добавляем состояние ошибки
    const defaultProfileIcon = "/resources/default_icon.png";

    const fetchUser = async () => {
        try {
            setLoading(true);
            setError(null);

            // Формируем URL для запроса
            const url = userId
                ? `${process.env.REACT_APP_API_BASE_URL}/users/other/${userId}`
                : `${process.env.REACT_APP_API_BASE_URL}/users/me`;

            console.log("Fetching user from:", url);

            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                console.log("User data:", data);

                setUser(data);

                // Сохраняем данные в localStorage, если пользователь совпадает
                if (userId === currentUserId) {
                    const profilePictureUrl = data.profilePictureUrl
                        ? `${process.env.REACT_APP_STATIC_URL}/${data.profilePictureUrl}`
                        : `${defaultProfileIcon}`;

                    localStorage.setItem("myProfilePicture", profilePictureUrl);
                    localStorage.setItem("currentUserId", String(data.userId));
                }
            } else {
                console.error("Ошибка при загрузке данных профиля");
                setError("Failed to fetch user data");
            }
        } catch (error) {
            console.error("Ошибка:", error);
            setError("Unexpected error occurred");
        } finally {
            setLoading(false); // Устанавливаем загрузку в false в любом случае
        }
    };

    // Выполняем запрос при изменении userId, currentUserId или token
    useEffect(() => {
        if (token) {
            fetchUser();
        }
    }, [userId, currentUserId, token]);

    // Возвращаем состояние пользователя, загрузки и ошибки
    return { user, loading, error };
};
