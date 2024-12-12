import axios from "axios";

const API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/messages`;

const MessageService = {
    /**
     * Получение токена из localStorage
     * @returns {string | null} - Токен авторизации
     */
    getToken: () => {
        return localStorage.getItem("authToken");
    },

    /**
     * Отправить сообщение
     * @param {Object} message - Объект сообщения
     * @returns {Promise<Object>} - Сохранённое сообщение
     */
    sendMessage: async (message) => {
        try {
            const token = MessageService.getToken();
            const response = await axios.post(API_BASE_URL, message, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Ошибка при отправке сообщения:", error);
            throw error;
        }
    },
    /**
     * Пометить сообщение как удалённое
     * @param {Object} message - Объект сообщения
     * @returns {Promise<Object>} - Обновлённое сообщение
     */
    markDeleteMessage: async (message) => {
        try {
            const token = MessageService.getToken();
            const response = await axios.post(
                `${API_BASE_URL}/markDelete`,
                message,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error("Ошибка при пометке сообщения как удалённого:", error);
            throw error;
        }
    },
    /**
     * Получить сообщения для конкретного пользователя
     * @param {string} recipient - Имя получателя
     * @returns {Promise<Array>} - Список сообщений
     */
    getMessagesForRecipient: async (recipient) => {
        try {
            const token = MessageService.getToken();
            const response = await axios.get(`${API_BASE_URL}/recipient/${recipient}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Ошибка при получении сообщений для получателя:", error);
            throw error;
        }
    },

    /**
     * Получить сообщения для конкретного пользователя
     * @param {string} recipient - Имя получателя
     * @returns {Promise<Array>} - Список сообщений
     */
    getDeletedMessages: async (recipient) => {
        try {
            const token = MessageService.getToken();
            const response = await axios.get(`${API_BASE_URL}/deleted`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Ошибка при получении сообщений для получателя:", error);
            throw error;
        }
    },

    /**
     * Получить сообщения от конкретного отправителя
     * @param {string} sender - Имя отправителя
     * @returns {Promise<Array>} - Список сообщений
     */
    getMessagesFromSender: async (sender) => {
        try {
            const token = MessageService.getToken();
            const response = await axios.get(`${API_BASE_URL}/sender/${sender}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Ошибка при получении сообщений от отправителя:", error);
            throw error;
        }
    },

    getSearch: async (search) => {
        try {
            const token = MessageService.getToken();
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/messages/search`, {
                params: { query: search },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Ошибка при получении сообщений от отправителя:", error);
            throw error;
        }
    },

    /**
     * Удалить сообщение по ID
     * @param {number} id - ID сообщения
     * @returns {Promise<void>} - Результат операции
     */
    deleteMessage: async (id) => {
        try {
            const token = MessageService.getToken();
            await axios.delete(`${API_BASE_URL}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.error("Ошибка при удалении сообщения:", error);
            throw error;
        }
    },

    /**
     * Получить сообщение по ID
     * @param {number} id - ID сообщения
     * @returns {Promise<Object>} - Найденное сообщение
     */
    getMessageById: async (id) => {
        try {
            const token = MessageService.getToken();
            const response = await axios.get(`${API_BASE_URL}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Ошибка при получении сообщения по ID:", error);
            throw error;
        }
    },
};

export default MessageService;
