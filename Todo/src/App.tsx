import React from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import TodoFilters from './components/TodoFilters';
import Header from './components/Header';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Header />
        <div className="space-y-6">
          <TodoForm />
          <TodoFilters />
          <TodoList />
        </div>
      </div>
    </div>
  );
}

export default App;
