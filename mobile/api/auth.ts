import api from './client';
import { LoginCredentials, LoginResponse } from './types';

export const login = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>('/users/login', credentials);
  return data;
};
