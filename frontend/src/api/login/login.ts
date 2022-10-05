import axios from 'axios';

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const createSession = async (email: any, password: any)=> {
    return await api.post('/login', { email, password });

};
