import api from "./api.js"; // Placeholder for future API integration

export const login = (credentials) => {
    return api.post('/login', credentials);
};