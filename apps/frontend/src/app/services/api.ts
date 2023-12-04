import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { getAccessToken, getRefreshToken, saveToken } from './token';
import { IAuthToken } from '@fit-friends/shared';

const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use((config: AxiosResponse) => {
    return config;
},  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;

        try {
            const {data} = await api.post<IAuthToken>('/auth/refresh', {refreshToken: getRefreshToken()});
            saveToken(data);
            return api.request(originalRequest);
        } catch (err) {
            console.log('НЕ АВТОРИЗОВАН');
        }
    }

    throw error;
});

export default api;
