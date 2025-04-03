
import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { TodoService, Todo } from '@/lib/api';
import TodoList from '@/components/TodoList';
import TodoForm from '@/components/TodoForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

const Index = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | undefined>(undefined);
  const [todoIdToDelete, setTodoIdToDelete] = useState<number | null>(null);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    search: ''
  });

  const queryClient = useQueryClient();

  const { data: todos = [], isLoading, error } = useQuery({
    queryKey: ['todos', filters],
    queryFn: () => TodoService.getAll({ 
      status: filters.status, 
      priority: filters.priority 
    }),
  });

  const createTodoMutation = useMutation({
    mutationFn: TodoService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setIsFormOpen(false);
      toast.success('Task added successfully!');
    },
    onError: (error) => {
      console.error('Error creating todo:', error);
      toast.error('Failed to add task.');
    },
  });

  const updateTodoMutation = useMutation({
    mutationFn: ({ id, todo }: { id: number; todo: Partial<Todo> }) => 
      TodoService.update(id, todo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setIsFormOpen(false);
      setSelectedTodo(undefined);
      toast.success('Task updated successfully!');
    },
    onError: (error) => {
      console.error('Error updating todo:', error);
      toast.error('Failed to update task.');
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: TodoService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setIsDeleteDialogOpen(false);
      toast.success('Task deleted successfully!');
    },
    onError: (error) => {
      console.error('Error deleting todo:', error);
      toast.error('Failed to delete task.');
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: 'pending' | 'completed' | 'in-progress' }) => 
      TodoService.update(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: (error) => {
      console.error('Error updating status:', error);
      toast.error('Failed to update task status.');
    },
  });

  const handleSubmit = (todo: Todo) => {
    if (selectedTodo && selectedTodo.id) {
      updateTodoMutation.mutate({ 
        id: selectedTodo.id, 
        todo 
      });
    } else {
      createTodoMutation.mutate(todo);
    }
  };

  const handleEdit = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsFormOpen(true);
  };

  const handleDelete = (id: number) => {
    setTodoIdToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (todoIdToDelete) {
      deleteTodoMutation.mutate(todoIdToDelete);
    }
  };

  const handleStatusChange = (id: number, status: 'pending' | 'completed' | 'in-progress') => {
    updateStatusMutation.mutate({ id, status });
  };

  const handleFilterChange = (newFilters: { status: string; priority: string; search: string }) => {
    setFilters(newFilters);
  };

  const filteredTodos = todos.filter(todo => {
    // Apply search filter if exists
    if (filters.search && 
        !todo.title.toLowerCase().includes(filters.search.toLowerCase()) &&
        !todo.description?.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  // Display error message if there's an issue fetching todos
  useEffect(() => {
    if (error) {
      toast.error('Failed to load tasks. Please try again later.');
    }
  }, [error]);

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
      
      {/* Form Dialog */}
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
      
      {/* Delete Confirmation Dialog */}
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
