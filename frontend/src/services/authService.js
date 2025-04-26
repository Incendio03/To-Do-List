import apiClient from "../config/api";

export const loginUser = async (username, password) => {
    try{

        const response = await apiClient.post('/login', {username, password});

        // Store current user info upon login in localStorage
        const userData = response.data.user || {username};
        localStorage.setItem('currentUser', JSON.stringify(userData));

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

export const getCurrentUser = () => {
    try {
        const userStr = localStorage.getItem('currentUser');
        if (userStr) {
            return JSON.parse(userStr)
        }
    } catch (error) {
        console.error('Error getting current user:', error);
        return null;
    }
}

export const logout = () => {
    localStorage.removeItem('currentUser');
};