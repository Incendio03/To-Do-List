import apiClient from "../config/api";
import { getCurrentUser } from "./authService";

export const createList = async (title, description) => {
    try {
        const currentUser = getCurrentUser();

        if (!currentUser || !currentUser.id){
            throw new Error("You must be logged in to create a list");
        }


        const response = await apiClient.post('/lists', {
            title, 
            description,
            userId: currentUser.id    
        });

        return response.data;


    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Failed to create list';
        console.error('List creation error:', errorMessage);
        throw new Error(errorMessage);
    }
}

export const editList = async (listId, title, description) => {
    try {
        const currentUser = getCurrentUser();
        
         if (!currentUser || !currentUser.id){
            throw new Error("You must be logged in to create a list");
        }

        const response = await apiClient.put(`/lists/${listId}`, {
            title,
            description,
            userId: currentUser.id
        });

        return response.data;
    } catch (error) {
        const errorMessage = error?.data?.message || 'Failed to update list';
        console.error('List update error:', errorMessage);
        throw new Error(errorMessage);
    }
}

export const getUserLists = async () => {
    try {
        const currentUser = getCurrentUser();

        if (!currentUser || !currentUser.id){
            throw new Error("You must be logged in to view lists");
        }

        const response = await apiClient.get(`/lists/user/${currentUser.id}`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Failed to fetch lists';
        console.error('Lists fetch error:', errorMessage);
        throw new Error(errorMessage);
    }
}