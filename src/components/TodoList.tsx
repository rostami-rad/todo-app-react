import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { useTodos } from '../hooks/useTodos';
import { reorderTodos } from '../store/todoSlice';
import TodoItem from './TodoItem';
import { Loader2, AlertCircle, Inbox, RefreshCw } from 'lucide-react';

const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { todos, isLoading, error, refreshTodos } = useTodos();
  const { filterOptions } = useAppSelector((state) => state.todos);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;
    
    if (source.index !== destination.index) {
      dispatch(reorderTodos({
        sourceIndex: source.index,
        destinationIndex: destination.index,
      }));
    }
  };

  // TODO: add drag feedback later
  const handleDragStart = (result: any) => {
    // drag started
  };

  const handleDragUpdate = (result: any) => {
    // drag update
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <Loader2 className="w-8 h-8 text-primary-600 animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Loading your tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-4" />
        <p className="text-red-600 mb-2">Error loading tasks</p>
        <p className="text-gray-600 text-sm">{error}</p>
      </div>
    );
  }

  if (todos.length === 0) {
    const hasFilters = filterOptions.status !== 'all' || filterOptions.search !== '';
    
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <Inbox className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {hasFilters ? 'No tasks found' : 'No tasks yet'}
        </h3>
        <p className="text-gray-600">
          {hasFilters 
            ? 'Try adjusting your filters or search terms.'
            : 'Create your first task to get started!'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Your Tasks ({todos.length})
          </h2>
          <button
            onClick={refreshTodos}
            className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
            title="Refresh tasks from server"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
         <div className="text-sm text-gray-500">
           <p>💡 <strong>Drag and drop to reorder tasks</strong></p>
           <p className="text-xs mt-1">Click and drag any part of a task to reorder</p>
         </div>
      </div>

      <DragDropContext 
        onDragStart={handleDragStart}
        onDragUpdate={handleDragUpdate}
        onDragEnd={handleDragEnd}
      >
        <Droppable droppableId="todos">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`space-y-3 transition-colors duration-200 ${
                snapshot.isDraggingOver ? 'bg-blue-50 rounded-lg p-2' : ''
              }`}
            >
              {todos.map((todo, index) => (
                <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`transition-all duration-200 ${
                        snapshot.isDragging 
                          ? 'scale-105 shadow-lg rotate-2 z-10' 
                          : 'hover:shadow-md'
                      }`}
                    >
                      <TodoItem todo={todo} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TodoList;
