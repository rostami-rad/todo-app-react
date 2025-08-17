import React, { useState } from 'react';
import { useTodos } from '../hooks/useTodos';
import { todoFormSchema, TodoFormSchema } from '../utils/validation';
import { Plus, Loader2 } from 'lucide-react';

const TodoForm: React.FC = () => {
  const [formData, setFormData] = useState<TodoFormSchema>({ title: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { createTodo, isCreating } = useTodos();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const validatedData = todoFormSchema.parse(formData);
      
      await createTodo({
        todo: validatedData.title,
        completed: false,
        userId: 1, // TODO: get actual user ID later
      });

      setFormData({ title: '' });
    } catch (error: any) {
      // quick fix: simplified error handling
      if (error.errors) {
        const newErrors: { [key: string]: string } = {};
        error.errors.forEach((err: any) => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
      } else {
        // fallback error
        setErrors({ title: 'Something went wrong' });
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // clear error when typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Task Title
          </label>
          <div className="relative">
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter your task here..."
              className={`input-field pr-10 ${errors.title ? 'border-red-500 focus:ring-red-500' : ''}`}
              disabled={isCreating}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isCreating || !formData.title.trim()}
          className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isCreating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Adding...</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              <span>Add Task</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
