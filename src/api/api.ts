import axios from "axios"
import dotenv from 'dotenv';
dotenv.config();

const baseURL = import.meta.env.VITE_API_URL ?? "http://localhost:8000"

export const api = axios.create({
    baseURL
})