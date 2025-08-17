import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/todo';

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  filterOptions: {
    status: 'all' | 'completed' | 'incomplete';
    search: string;
  };
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
  filterOptions: {
    status: 'all',
    search: '',
  },
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
      state.loading = false;
      state.error = null;
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      // TODO: maybe add sorting later
      state.todos.unshift(action.payload);
    },
    updateTodo: (state, action: PayloadAction<Partial<Todo> & { id: number }>) => {
      const index = state.todos.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = { ...state.todos[index], ...action.payload };
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    reorderTodos: (state, action: PayloadAction<{ sourceIndex: number; destinationIndex: number }>) => {
      const { sourceIndex, destinationIndex } = action.payload;
      const [removed] = state.todos.splice(sourceIndex, 1);
      state.todos.splice(destinationIndex, 0, removed);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setFilterStatus: (state, action: PayloadAction<'all' | 'completed' | 'incomplete'>) => {
      state.filterOptions.status = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.filterOptions.search = action.payload;
    },
    clearFilters: (state) => {
      // reset to default
      state.filterOptions = {
        status: 'all',
        search: '',
      };
    },
  },
});

export const {
  setTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  reorderTodos,
  setLoading,
  setError,
  setFilterStatus,
  setSearchQuery,
  clearFilters,
} = todoSlice.actions;

export default todoSlice.reducer;
