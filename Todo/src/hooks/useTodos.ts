import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import { todoApi } from '../services/todoApi';
import {
  setTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  setLoading,
  setError,
} from '../store/todoSlice';
import { Todo, CreateTodoRequest, UpdateTodoRequest } from '../types/todo';

export const useTodos = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { todos, filterOptions } = useAppSelector((state) => state.todos);

  // TODO: maybe add caching strategy later
  const {
    data: fetchedTodos,
    isLoading,
    error,
    refetch,
  } = useQuery('todos', todoApi.getAllTodos, {
    onSuccess: (data) => {
      // only sync on initial load
      if (todos.length === 0) {
        dispatch(setTodos(data));
      }
    },
    onError: (error: any) => {
      dispatch(setError(error.message || 'Failed to fetch todos'));
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const createTodoMutation = useMutation(
    (todoData: CreateTodoRequest) => todoApi.createTodo(todoData),
    {
      onSuccess: (newTodo) => {
        // quick fix: generate local ID since DummyJSON doesn't persist
        const localTodo = {
          ...newTodo,
          id: Date.now(),
          isLocal: true,
        };
        dispatch(addTodo(localTodo));
      },
      onError: (error: any) => {
        // simplified error handling
        dispatch(setError('Failed to create todo'));
      },
    }
  );

  const updateTodoMutation = useMutation(
    ({ id, updateData }: { id: number; updateData: UpdateTodoRequest }) => {
      const todo = todos.find(t => t.id === id);
      if (todo?.isLocal) {
        // local todos don't need API call
        return Promise.resolve({ ...todo, ...updateData });
      }
      return todoApi.updateTodo(id, updateData);
    },
    {
      onSuccess: (updatedTodo) => {
        dispatch(updateTodo(updatedTodo));
      },
      onError: (error: any) => {
        // TODO: better error handling here
        dispatch(setError('Update failed'));
      },
    }
  );

  const deleteTodoMutation = useMutation(
    (id: number) => {
      const todo = todos.find(t => t.id === id);
      if (todo?.isLocal) {
        // workaround for local todos
        return Promise.resolve({ id, deleted: true });
      }
      return todoApi.deleteTodo(id);
    },
    {
      onSuccess: (_, deletedId) => {
        dispatch(deleteTodo(deletedId));
      },
      onError: (error: any) => {
        // simplified error message
        dispatch(setError('Delete failed'));
      },
    }
  );

  // filter logic - could be moved to selector later
  const filteredTodos = todos.filter((todo) => {
    const matchesStatus =
      filterOptions.status === 'all' ||
      (filterOptions.status === 'completed' && todo.completed) ||
      (filterOptions.status === 'incomplete' && !todo.completed);

    const matchesSearch =
      filterOptions.search === '' ||
      todo.todo.toLowerCase().includes(filterOptions.search.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  // manual refresh function
  const refreshTodos = async () => {
    try {
      const freshTodos = await todoApi.getAllTodos();
      dispatch(setTodos(freshTodos));
    } catch (error: any) {
      // TODO: handle this better
      dispatch(setError('Refresh failed'));
    }
  };

  return {
    todos: filteredTodos,
    allTodos: todos,
    isLoading,
    error,
    refetch,
    refreshTodos,
    createTodo: createTodoMutation.mutate,
    updateTodo: updateTodoMutation.mutate,
    deleteTodo: deleteTodoMutation.mutate,
    isCreating: createTodoMutation.isLoading,
    isUpdating: updateTodoMutation.isLoading,
    isDeleting: deleteTodoMutation.isLoading,
  };
};
