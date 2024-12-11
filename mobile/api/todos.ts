import api from './client';
import { CreateTodoDTO, Todo, UpdateTodoDTO } from './types';

export const getTodos = async () => {
  const response = await api.get('/todos');
  // If needed, sort by a consistent field like creation date
  return response.data.sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );
};

export const getTodoById = async (id: number): Promise<Todo> => {
  const { data } = await api.get<Todo>(`/todos/${id}`);
  return data;
};

export const createTodo = async (todo: CreateTodoDTO): Promise<Todo> => {
  const { data } = await api.post<Todo>('/todos', todo);
  return data;
};

export const updateTodo = async (
  id: number,
  todo: UpdateTodoDTO
): Promise<Todo> => {
  const { data } = await api.put<Todo>(`/todos/${id}`, todo);
  return data;
};

export const deleteTodo = async (id: number): Promise<void> => {
  await api.delete(`/todos/${id}`);
};
