export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
  isLocal?: boolean; // TODO: remove this when we have real persistence
}

export interface CreateTodoRequest {
  todo: string;
  completed: boolean;
  userId: number;
}

export interface UpdateTodoRequest {
  completed?: boolean;
  todo?: string;
}

export interface TodoFormData {
  title: string;
}

export interface FilterOptions {
  status: 'all' | 'completed' | 'incomplete';
  search: string;
}
