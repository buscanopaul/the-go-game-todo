import { useMutation } from '@tanstack/react-query';
import { login, register } from '../api/auth';
import * as SecureStore from 'expo-secure-store';

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      await SecureStore.setItemAsync('userToken', data.access_token);
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
    onSuccess: async (data) => {
      await SecureStore.setItemAsync('userToken', data.access_token);
    },
  });
};
