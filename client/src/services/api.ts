import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://trainee.fidelis.workers.dev/api',
  withCredentials: false,
  headers: {
    'Authorization': 'Bearer f72dc585-81c3-4f4a-ac8b-1423029ca34b',
    'Content-Type': 'application/json',
  },
});

