import axios from 'axios'


export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000', // lido do .env
  withCredentials: true,                 // envia o cookie httpOnly automaticamente
  headers: {
    'Content-Type': 'application/json',
  },
  // Remova o header Authorization com o token hardcoded — não é mais necessário.
  // A autenticação agora é feita via cookie, que o browser envia sozinho.
})

// Redireciona para /login sempre que a API retornar 401 (token expirado ou ausente)
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Evita recarregar a mesma rota quando já estivermos em /login
      if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
      // Caso já estejamos em /login, apenas propaga o erro sem forçar reload
    }
    return Promise.reject(error)
  }
)