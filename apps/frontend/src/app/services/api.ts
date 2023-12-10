import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';
import { IAuthToken, IErrorResponse } from '@fit-friends/shared';
import { dropToken, getAccessToken, getRefreshToken, saveToken } from './token';
import { history } from '../utils/history';
import { RouteName } from '../constants/route';
import { API_URL, ErrorCode } from '../constants/common';
import { AppError } from '@fit-friends/libs/validation';

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

    if (
      error.response &&
      error.response.status >= ErrorCode.BadRequest &&
      error.response.status !== ErrorCode.unauthorized &&
      error.response.status !== ErrorCode.NotFound &&
      error.response.status !== ErrorCode.UnprocsableEntity
    ) {
      const message = (error.response.data as IErrorResponse).message;
      toast.error(!Array.isArray(message) && message, { toastId: message as string });
    }

    if (error.response.status === ErrorCode.NotFound) {
      history.navigate(RouteName.NotFound);
      dropToken();
      return;
    }

    if (error.response.status >= ErrorCode.ServerError) {
      toast.error(AppError.ServerError);
      return;
    }

    throw error;
  },
);

export default api;
