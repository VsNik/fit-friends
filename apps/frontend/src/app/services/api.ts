import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { dropToken, getAccessToken, getRefreshToken, saveToken } from './token';
import { IAuthToken } from '@fit-friends/shared';
import { history } from '../utils/history';
import { RouteName } from '../constants/route';

const API_URL = '/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (config: AxiosResponse) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;

      try {
        const { data } = await axios.post<IAuthToken>(`${API_URL}/auth/refresh`, { refreshToken: getRefreshToken() });
        saveToken(data);
        return await api.request(originalRequest);
      } catch (err) {
        dropToken();
        return;
      }
    }

    if (error.response.status === 404) {
      history.navigate(RouteName.NotFound);
      return;
    }

    if (error.response.status >= 500) {
      console.log('SERVER ERROR');
      return;
    }

    throw error;
  },
);

export default api;
