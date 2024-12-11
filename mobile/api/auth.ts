import api from './client';
import { LoginCredentials, LoginResponse } from './types';

export const login = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>('/users/login', credentials);
  return data;
};

export const register = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>(
    '/users/register',
    credentials
  );
  return data;
};
