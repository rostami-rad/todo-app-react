import React, { useState } from 'react';
import { Todo } from '../types/todo';
import { useTodos } from '../hooks/useTodos';
import { CheckCircle, Circle, Trash2, Loader2 } from 'lucide-react';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { updateTodo, deleteTodo, isUpdating, isDeleting } = useTodos();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleStatusToggle = () => {
    updateTodo({
      id: todo.id,
      updateData: { completed: !todo.completed },
    });
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
    setShowDeleteConfirm(false);
  };

  const confirmDelete = () => {
    // TODO: replace with proper modal later
    if (window.confirm(`Are you sure you want to delete "${todo.todo}"?`)) {
      handleDelete();
    }
  };

  return (
    <div className={`todo-item ${todo.completed ? 'todo-completed' : ''}`}>
      <div className="flex items-center space-x-3">
        <button
          onClick={handleStatusToggle}
          disabled={isUpdating}
          className="flex-shrink-0 p-1 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
          title={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {isUpdating ? (
            <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
          ) : todo.completed ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <Circle className="w-5 h-5 text-gray-400" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <h3 
            className={`todo-title text-lg font-medium transition-all duration-200 ${
              todo.completed ? 'text-gray-500' : 'text-gray-900'
            }`}
          >
            {todo.todo}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            ID: {todo.id} • User: {todo.userId}
            {todo.isLocal && <span className="ml-2 text-blue-500 text-xs">(Local)</span>}
          </p>
        </div>

        <button
          onClick={confirmDelete}
          disabled={isDeleting}
          className="flex-shrink-0 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
          title="Delete todo"
        >
          {isDeleting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Trash2 className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
