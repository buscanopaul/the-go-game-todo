export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTodoDTO {
  title: string;
}

export interface UpdateTodoDTO {
  title?: string;
  completed?: boolean;
}
