# Todo App - Task Management Application

A modern, feature-rich Todo application built with React, TypeScript, Redux Toolkit, React Query, and Tailwind CSS. This application provides a comprehensive task management solution with drag-and-drop functionality, real-time filtering, and search capabilities.

## 🚀 Features

### Core Functionality
- **View Todos**: Display a list of todos fetched from the DummyJSON API
- **Add Todos**: Create new tasks with form validation using Zod
- **Delete Todos**: Remove tasks with confirmation dialogs
- **Status Toggle**: Mark tasks as completed/incomplete with visual feedback
- **Drag & Drop**: Reorder tasks using intuitive drag-and-drop interface

### Advanced Features
- **Real-time Filtering**: Filter todos by status (All, Completed, Incomplete)
- **Search Functionality**: Search through todos by title
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Optimistic Updates**: Immediate UI feedback with React Query
- **Error Handling**: Comprehensive error handling and user feedback
- **Loading States**: Loading indicators for all async operations

### Technical Features
- **State Management**: Redux Toolkit for centralized state management
- **Data Fetching**: React Query for efficient API calls and caching
- **Type Safety**: Full TypeScript implementation
- **Form Validation**: Zod schema validation
- **Modern UI**: Beautiful, accessible interface with smooth animations

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **State Management**: Redux Toolkit
- **Data Fetching**: React Query (TanStack Query)
- **Styling**: Tailwind CSS
- **Form Validation**: Zod
- **Drag & Drop**: react-beautiful-dnd
- **Icons**: Lucide React
- **Build Tool**: Vite
- **API**: DummyJSON REST API

## 📋 API Endpoints

The application uses the following DummyJSON API endpoints:

- `GET /todos` - Fetch all todos
- `POST /todos/add` - Create a new todo
- `PATCH /todos/{id}` - Update a todo
- `DELETE /todos/{id}` - Delete a todo

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd todo-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🎯 Usage Guide

### Adding a New Task
1. Type your task title in the "Add New Task" form
2. Click "Add Task" or press Enter
3. The task will appear at the top of your list

### Managing Tasks
- **Complete/Incomplete**: Click the circle icon next to any task
- **Delete**: Click the trash icon to remove a task (confirmation required)
- **Reorder**: Drag and drop tasks to change their order

### Filtering and Search
- **Status Filter**: Use the filter buttons to show All, Completed, or Incomplete tasks
- **Search**: Use the search bar to find specific tasks
- **Clear Filters**: Click "Clear" to reset all filters

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Application header
│   ├── TodoForm.tsx    # Add new todo form
│   ├── TodoFilters.tsx # Filter and search controls
│   ├── TodoItem.tsx    # Individual todo item
│   └── TodoList.tsx    # Todo list with drag & drop
├── hooks/              # Custom React hooks
│   ├── useAppDispatch.ts # Typed Redux dispatch
│   ├── useAppSelector.ts # Typed Redux selector
│   └── useTodos.ts     # Todo management hook
├── services/           # API services
│   └── todoApi.ts     # Todo API integration
├── store/              # Redux store
│   ├── store.ts       # Store configuration
│   └── todoSlice.ts   # Todo state slice
├── types/              # TypeScript type definitions
│   └── todo.ts        # Todo-related types
├── utils/              # Utility functions
│   └── validation.ts  # Zod validation schemas
├── App.tsx            # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## 🔧 Configuration

### Environment Variables
The application is configured to use the DummyJSON API by default. No environment variables are required for basic functionality.

### Customization
- **Styling**: Modify `tailwind.config.js` for custom design tokens
- **API**: Update `src/services/todoApi.ts` to use different endpoints
- **Validation**: Adjust `src/utils/validation.ts` for custom validation rules

## 🧪 Testing

The application includes comprehensive error handling and loading states. To test:

1. **Network Issues**: Disconnect internet to test error handling
2. **Slow API**: Use browser dev tools to simulate slow network
3. **Form Validation**: Try submitting empty forms or invalid data
4. **Drag & Drop**: Test reordering tasks in different scenarios

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy
The built files in the `dist/` directory can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3
- Firebase Hosting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [DummyJSON](https://dummyjson.com/) for providing the API
- [React Beautiful DnD](https://github.com/atlassian/react-beautiful-dnd) for drag & drop functionality
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide](https://lucide.dev/) for beautiful icons

---

**Built with ❤️ using modern web technologies**
