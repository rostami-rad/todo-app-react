import React from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { setFilterStatus, setSearchQuery, clearFilters } from '../store/todoSlice';
import { Search, Filter, X } from 'lucide-react';

const TodoFilters: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filterOptions, todos } = useAppSelector((state) => state.todos);

  const completedCount = todos.filter(todo => todo.completed).length;
  const incompleteCount = todos.filter(todo => !todo.completed).length;

  const handleStatusChange = (status: 'all' | 'completed' | 'incomplete') => {
    dispatch(setFilterStatus(status));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const hasActiveFilters = filterOptions.status !== 'all' || filterOptions.search !== '';

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filter by:</span>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => handleStatusChange('all')}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                filterOptions.status === 'all'
                  ? 'bg-primary-100 text-primary-700 border border-primary-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All ({todos.length})
            </button>
            <button
              onClick={() => handleStatusChange('completed')}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                filterOptions.status === 'completed'
                  ? 'bg-green-100 text-green-700 border border-green-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Completed ({completedCount})
            </button>
            <button
              onClick={() => handleStatusChange('incomplete')}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                filterOptions.status === 'incomplete'
                  ? 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Incomplete ({incompleteCount})
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={filterOptions.search}
              onChange={handleSearchChange}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-64"
            />
          </div>
          
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoFilters;
