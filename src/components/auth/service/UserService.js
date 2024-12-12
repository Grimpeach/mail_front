export const logout = async (token: String) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(""),
        });

        if (!response.ok) {
            throw new Error('Failed to logout');
        }

        return await response.json();
    } catch (error) {
        console.error('Error during logout:', error);
        throw error;
    }
};