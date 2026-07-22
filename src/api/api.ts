import axios from "axios"
import dotenv from 'dotenv';
dotenv.config();

const baseURL = process.env.API_URL ?? "http://localhost:8000"

export const api = axios.create({
    baseURL
})