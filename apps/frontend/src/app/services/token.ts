import { IAuthToken } from '@fit-friends/shared';

export const saveToken = (authToken: IAuthToken) => {
  localStorage.setItem('access_token', authToken.accessToken);

  if (authToken.refreshToken) {
    localStorage.setItem('refresh_token', authToken.refreshToken);
  }
};

export const getAccessToken = () => {
  return localStorage.getItem('access_token');
};

export const getRefreshToken = () => {
  return localStorage.getItem('refresh_token');
};

export const dropToken = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};
