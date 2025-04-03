
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context
const TodoContext = createContext();

// Sample initial todos
const initialTodos = [
  {
    id: 1,
    title: 'Complete React project',
    description: 'Finish building the todo app with Context API',
    status: 'in-progress',
    priority: 'high',
    dueDate: new Date(Date.now() + 86400000).toISOString(), // tomorrow
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Learn Context API',
    description: 'Master React Context API for state management',
    status: 'completed',
    priority: 'medium',
    dueDate: new Date().toISOString(),
    createdAt: new Date(Date.now() - 86400000).toISOString() // yesterday
  },
  {
    id: 3,
    title: 'Review JavaScript fundamentals',
    description: 'Go through JavaScript basics to strengthen knowledge',
    status: 'pending',
    priority: 'low',
    dueDate: new Date(Date.now() + 3 * 86400000).toISOString(), // 3 days later
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString() // 2 days ago
  }
];

// Create a provider component
export const TodoProvider = ({ children }) => {
  // Get todos from localStorage or use initial data
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : initialTodos;
  });
  
  const [isLoading, setIsLoading] = useState(false);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Create a new todo
  const createTodo = (todo) => {
    setIsLoading(true);
    setTimeout(() => {
      const newTodo = {
        ...todo,
        id: Date.now(),
        createdAt: new Date().toISOString()
      };
      setTodos([...todos, newTodo]);
      setIsLoading(false);
    }, 300); // Simulate API delay
  };

  // Update a todo
  const updateTodo = (id, updatedTodo) => {
    setIsLoading(true);
    setTimeout(() => {
      setTodos(
        todos.map((todo) => (todo.id === id ? { ...todo, ...updatedTodo } : todo))
      );
      setIsLoading(false);
    }, 300); // Simulate API delay
  };

  // Delete a todo
  const deleteTodo = (id) => {
    setIsLoading(true);
    setTimeout(() => {
      setTodos(todos.filter((todo) => todo.id !== id));
      setIsLoading(false);
    }, 300); // Simulate API delay
  };

  // Change todo status
  const updateTodoStatus = (id, status) => {
    setIsLoading(true);
    setTimeout(() => {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, status } : todo
        )
      );
      setIsLoading(false);
    }, 300); // Simulate API delay
  };

  // Filter todos
  const filterTodos = (filters) => {
    const { status, priority, search } = filters;
    return todos.filter((todo) => {
      // Status filter
      if (status !== 'all' && todo.status !== status) return false;
      
      // Priority filter
      if (priority !== 'all' && todo.priority !== priority) return false;
      
      // Search filter
      if (
        search &&
        !todo.title.toLowerCase().includes(search.toLowerCase()) &&
        !(todo.description && todo.description.toLowerCase().includes(search.toLowerCase()))
      ) {
        return false;
      }
      
      return true;
    });
  };

  // Context value
  const value = {
    todos,
    isLoading,
    createTodo,
    updateTodo,
    deleteTodo,
    updateTodoStatus,
    filterTodos
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

// Custom hook to use the todo context
export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};
