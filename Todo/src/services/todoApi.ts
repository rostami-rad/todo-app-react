import { Todo, CreateTodoRequest, UpdateTodoRequest } from '../types/todo';

const API_BASE_URL = 'https://dummyjson.com';

export const todoApi = {
  // fetch all todos from API
  async getAllTodos(): Promise<Todo[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/todos`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.todos || [];
    } catch (error) {
      // TODO: add better error logging
      console.error('Error fetching todos:', error);
      throw error;
    }
  },

  // create new todo
  async createTodo(todoData: CreateTodoRequest): Promise<Todo> {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      // quick fix: simplified error handling
      console.error('Error creating todo:', error);
      throw new Error('Failed to create todo');
    }
  },

  // update existing todo
  async updateTodo(id: number, updateData: UpdateTodoRequest): Promise<Todo> {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      // TODO: improve error handling
      console.error('Error updating todo:', error);
      throw error;
    }
  },

  // remove todo
  async deleteTodo(id: number): Promise<{ id: number; deleted: boolean }> {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      // workaround: return simple error
      console.error('Error deleting todo:', error);
      throw new Error('Delete failed');
    }
  },
};
