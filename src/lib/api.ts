
import axios from 'axios';

const API_URL = import.meta.env.PROD ? 
  '/api/todos' : 
  'http://localhost:5000/api/todos';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export interface Todo {
  id?: number;
  title: string;
  description?: string;
  status: 'pending' | 'completed' | 'in-progress';
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date | string | null;
  createdAt?: string;
  updatedAt?: string;
}

export const TodoService = {
  getAll: async (params?: { status?: string; priority?: string }) => {
    const response = await api.get<Todo[]>('/', { params });
    return response.data;
  },
  
  getById: async (id: number) => {
    const response = await api.get<Todo>(`/${id}`);
    return response.data;
  },
  
  create: async (todo: Todo) => {
    const response = await api.post<Todo>('/', todo);
    return response.data;
  },
  
  update: async (id: number, todo: Partial<Todo>) => {
    const response = await api.put<{ message: string }>(`/${id}`, todo);
    return response.data;
  },
  
  delete: async (id: number) => {
    const response = await api.delete<{ message: string }>(`/${id}`);
    return response.data;
  },
  
  deleteAll: async () => {
    const response = await api.delete<{ message: string }>('/');
    return response.data;
  },
  
  findByStatus: async (status: string) => {
    const response = await api.get<Todo[]>(`/?status=${status}`);
    return response.data;
  }
};
