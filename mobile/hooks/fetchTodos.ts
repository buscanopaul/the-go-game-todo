import { apiClient } from '../api/client';

export const fetchTodos = async (setTodos) => {
  const response = await apiClient.get('/todos');
  setTodos(response.data);
};
