import api from './client';
import { CreateTodoDTO, Todo, UpdateTodoDTO } from './types';

export const getTodos = async (): Promise<Todo[]> => {
  const { data } = await api.get<Todo[]>('/todos');
  return data;
};

export const getTodoById = async (id: string): Promise<Todo> => {
  const { data } = await api.get<Todo>(`/todos/${id}`);
  return data;
};

export const createTodo = async (todo: CreateTodoDTO): Promise<Todo> => {
  const { data } = await api.post<Todo>('/todos', todo);
  return data;
};

export const updateTodo = async (
  id: string,
  todo: UpdateTodoDTO
): Promise<Todo> => {
  const { data } = await api.put<Todo>(`/todos/${id}`, todo);
  return data;
};

export const deleteTodo = async (id: string): Promise<void> => {
  await api.delete(`/todos/${id}`);
};