
import React, { useState } from 'react';
import { toast } from "sonner";
import TodoList from '@/components/TodoList';
import TodoForm from '@/components/TodoForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useTodo } from '@/context/TodoContext';

const Index = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(undefined);
  const [todoIdToDelete, setTodoIdToDelete] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    search: ''
  });

  const { 
    isLoading, 
    createTodo, 
    updateTodo, 
    deleteTodo, 
    updateTodoStatus,
    filterTodos 
  } = useTodo();

  function handleEdit(todo) {
    setSelectedTodo(todo);
    setIsFormOpen(true);
  }

  function handleDelete(id) {
    setTodoIdToDelete(id);
    setIsDeleteDialogOpen(true);
  }

  function confirmDelete() {
    if (todoIdToDelete) {
      deleteTodo(todoIdToDelete);
      toast.success('Task deleted successfully!');
      setIsDeleteDialogOpen(false);
    }
  }

  function handleStatusChange(id, status) {
    updateTodoStatus(id, status);
  }

  function handleSubmit(todo) {
    if (selectedTodo && selectedTodo.id) {
      updateTodo(selectedTodo.id, todo);
      toast.success('Task updated successfully!');
    } else {
      createTodo(todo);
      toast.success('Task added successfully!');
    }
    setIsFormOpen(false);
    setSelectedTodo(undefined);
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Get filtered todos
  const filteredTodos = filterTodos(filters);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-8 text-center text-primary">Task Mastery</h1>
      
      <TodoList
        todos={filteredTodos}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
        onAddNewClick={() => {
          setSelectedTodo(undefined);
          setIsFormOpen(true);
        }}
        onFilterChange={handleFilterChange}
      />
      
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedTodo ? 'Edit Task' : 'Add New Task'}</DialogTitle>
          </DialogHeader>
          <TodoForm
            initialData={selectedTodo}
            onSubmit={handleSubmit}
            onCancel={() => setIsFormOpen(false)}
            isEditing={!!selectedTodo}
          />
        </DialogContent>
      </Dialog>
      
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Index;
