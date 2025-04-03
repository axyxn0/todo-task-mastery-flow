
import React, { useState } from 'react';
import TodoItem from './TodoItem';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, List, Plus } from "lucide-react";

const TodoList = ({
  todos,
  isLoading,
  onEdit,
  onDelete,
  onStatusChange,
  onAddNewClick,
  onFilterChange
}) => {
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    search: ''
  });

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center">
          <List className="mr-2" /> Task List
        </h2>
        <Button onClick={onAddNewClick}>
          <Plus size={18} className="mr-1" /> Add New Task
        </Button>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg space-y-4">
        <div className="font-medium">Filters</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Input
              placeholder="Search tasks..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full"
            />
          </div>
          
          <Select
            value={filters.status}
            onValueChange={(value) => handleFilterChange('status', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          
          <Select
            value={filters.priority}
            onValueChange={(value) => handleFilterChange('priority', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center p-10">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-4 text-gray-500">Loading tasks...</p>
          </div>
        ) : todos.length > 0 ? (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onEdit={onEdit}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
            />
          ))
        ) : (
          <div className="text-center p-10 bg-gray-50 rounded-lg">
            <Check className="h-12 w-12 text-gray-400 mx-auto" />
            <h3 className="mt-4 text-lg font-medium">No tasks found</h3>
            <p className="mt-2 text-gray-500">
              {filters.status !== 'all' || filters.priority !== 'all' || filters.search
                ? "Try adjusting your filters"
                : "Create your first task to get started"}
            </p>
            {filters.status === 'all' && filters.priority === 'all' && !filters.search && (
              <Button className="mt-4" onClick={onAddNewClick}>
                <Plus size={18} className="mr-1" /> Add Task
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
