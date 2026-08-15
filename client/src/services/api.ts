import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://localhost:3333',
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  },
});

