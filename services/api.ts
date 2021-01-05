import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.BACK_APP_URL || 'http://localhost:3333'
})