import axios from "axios";

export const apiClient = axios.create({
    baseURL: 'https://easydev.club/api/v1',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})