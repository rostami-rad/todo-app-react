import React from 'react';
import { CheckSquare } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-8">
      <div className="flex items-center justify-center space-x-3 mb-4">
        <CheckSquare className="w-8 h-8 text-primary-600" />
        <h1 className="text-4xl font-bold text-gray-900">Todo App</h1>
      </div>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Manage your tasks effectively with our powerful todo application. 
        Create, organize, and track your progress with ease.
      </p>
    </header>
  );
};

export default Header;
