import apiClient from "../config/api";

export const getUserById = async (id) => {
    try {
        const response = await apiClient.get(`/users/${id}`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Failed to fetch user';
        console.error('User fetch error:', errorMessage);
        throw new Error(errorMessage);
    }
}

export const getUserByUsername = async (username) => {
    try {
        const response = await apiClient.get('/users', {  params: { username }});
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Failed to fetch user';
        console.error('User fetch error:', errorMessage);
        throw new Error(errorMessage);
    }
}
