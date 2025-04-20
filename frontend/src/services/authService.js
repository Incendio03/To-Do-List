import apiClient from "../config/api";

export const loginUser = async (username, password) => {
    try{

        const response = await apiClient.post('/login', {username, password});
        return response.data;

    } catch(error) {
        const errorMessage = error.response?.data?.message || 'Login failed';
        console.error('Login error:', errorMessage);
        throw new Error(errorMessage);
    }
};

export const registerUser = async (username, password) => {
    try{
        const response = await apiClient.post('/signup', {username, password});
        return response.data

    } catch(error) {
        const errorMessage = error.response?.data?.message || 'User Registration Failed.';
        console.error('Registration error', errorMessage);
        throw new Error(errorMessage);
    }
};