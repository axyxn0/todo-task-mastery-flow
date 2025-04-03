
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import { Check, Edit, Trash2 } from 'lucide-react';
import { Todo } from '@/lib/api';
import { cn } from '@/lib/utils';

interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: 'pending' | 'completed' | 'in-progress') => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ 
  todo, 
  onEdit,
  onDelete,
  onStatusChange 
}) => {
  const handleStatusChange = () => {
    const newStatus = todo.status === 'completed' ? 'pending' : 'completed';
    onStatusChange(todo.id!, newStatus);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500 hover:bg-red-600';
      case 'medium':
        return 'bg-amber-500 hover:bg-amber-600';
      case 'low':
        return 'bg-green-500 hover:bg-green-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500">Completed</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-500">In Progress</Badge>;
      case 'pending':
      default:
        return <Badge className="bg-amber-500">Pending</Badge>;
    }
  };

  return (
    <Card className={cn(
      "transition-all hover:shadow-md border-l-4",
      todo.status === 'completed' ? "opacity-70 border-l-green-500" : 
      todo.priority === 'high' ? "border-l-red-500" :
      todo.priority === 'medium' ? "border-l-amber-500" : "border-l-green-500"
    )}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-2">
            <Checkbox 
              checked={todo.status === 'completed'} 
              onCheckedChange={handleStatusChange}
              className="mt-1"
            />
            <CardTitle className={cn(
              "text-md font-semibold transition-all",
              todo.status === 'completed' ? "line-through text-gray-500" : ""
            )}>
              {todo.title}
            </CardTitle>
          </div>
          <div className="flex space-x-1">
            {getStatusBadge(todo.status)}
          </div>
        </div>
      </CardHeader>
      
      {todo.description && (
        <CardContent className="py-2">
          <p className="text-sm text-gray-600 pl-6">
            {todo.description}
          </p>
        </CardContent>
      )}
      
      <CardFooter className="flex justify-between pt-2">
        <div className="text-xs text-gray-500">
          {todo.dueDate && (
            <span>
              Due: {format(new Date(todo.dueDate), 'MMM d, yyyy')}
            </span>
          )}
        </div>
        
        <div className="flex space-x-2">
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => onEdit(todo)}
          >
            <Edit size={16} />
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => onDelete(todo.id!)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TodoItem;
