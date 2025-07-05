
import { useState, useEffect } from 'react';
import { Plus, Search, Filter, Calendar, CheckCircle, Circle, Trash2, Edit3, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import TaskForm from '@/components/TaskForm';
import TaskCard from '@/components/TaskCard';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const { toast } = useToast();

  const categories = ['Work', 'Personal', 'Learning', 'Health', 'Finance'];

  useEffect(() => {
    const savedTasks = localStorage.getItem('smart-tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('smart-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskData) => {
    const newTask = {
      id: Date.now().toString(),
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => [...prev, newTask]);
    toast({
      title: "Task created",
      description: "Your task has been added successfully.",
    });
  };

  const updateTask = (taskId, updates) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, ...updates } : task
      )
    );
    toast({
      title: "Task updated",
      description: "Your task has been updated successfully.",
    });
  };

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    toast({
      title: "Task deleted",
      description: "Your task has been removed.",
      variant: "destructive",
    });
  };

  const toggleTaskCompletion = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    updateTask(taskId, { completed: !task.completed });
  };

  const isTaskOverdue = (deadline) => {
    if (!deadline) return false;
    return new Date(deadline) < new Date() && !tasks.find(t => t.deadline === deadline)?.completed;
  };

  const isTaskDueSoon = (deadline) => {
    if (!deadline) return false;
    const now = new Date();
    const due = new Date(deadline);
    const timeDiff = due - now;
    const daysDiff = timeDiff / (1000 * 3600 * 24);
    return daysDiff <= 3 && daysDiff > 0;
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || task.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'completed' && task.completed) ||
                         (filterStatus === 'pending' && !task.completed);
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
    overdue: tasks.filter(t => isTaskOverdue(t.deadline)).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-2 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 animate-fadeIn">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Smart Task Manager
          </h1>
          <p className="text-sm sm:text-base text-gray-600">Stay organized and boost your productivity</p>
        </div>

        {/* Horizontal Stats Bar */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6">
            {/* Total Tasks */}
            <div className="flex-1 min-w-0">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-4 sm:p-5 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs sm:text-sm font-medium opacity-90 mb-1">Total Tasks</div>
                    <div className="text-2xl sm:text-3xl font-bold">{taskStats.total}</div>
                  </div>
                  <div className="bg-white/20 p-2 sm:p-3 rounded-lg">
                    <Calendar className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                </div>
              </div>
            </div>

            {/* Completed Tasks */}
            <div className="flex-1 min-w-0">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-4 sm:p-5 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs sm:text-sm font-medium opacity-90 mb-1">Completed</div>
                    <div className="text-2xl sm:text-3xl font-bold">{taskStats.completed}</div>
                  </div>
                  <div className="bg-white/20 p-2 sm:p-3 rounded-lg">
                    <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                </div>
              </div>
            </div>

            {/* Pending Tasks */}
            <div className="flex-1 min-w-0">
              <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl p-4 sm:p-5 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs sm:text-sm font-medium opacity-90 mb-1">Pending</div>
                    <div className="text-2xl sm:text-3xl font-bold">{taskStats.pending}</div>
                  </div>
                  <div className="bg-white/20 p-2 sm:p-3 rounded-lg">
                    <Clock className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                </div>
              </div>
            </div>

            {/* Overdue Tasks */}
            <div className="flex-1 min-w-0">
              <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-xl p-4 sm:p-5 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs sm:text-sm font-medium opacity-90 mb-1">Overdue</div>
                    <div className="text-2xl sm:text-3xl font-bold">{taskStats.overdue}</div>
                  </div>
                  <div className="bg-white/20 p-2 sm:p-3 rounded-lg">
                    <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col xl:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-1 w-full">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 glass-input"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-full sm:w-48 glass-input">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-full sm:w-48 glass-input">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Tasks</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button
                onClick={() => setShowTaskForm(true)}
                className="gradient-btn hover:scale-105 transition-all duration-300 w-full sm:w-auto"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {filteredTasks.length === 0 ? (
            <div className="col-span-full text-center py-8 sm:py-12">
              <div className="text-gray-400 mb-4">
                <Calendar className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4" />
              </div>
              <h3 className="text-lg font-medium text-gray-600 mb-2">No tasks found</h3>
              <p className="text-gray-500 mb-4 text-sm sm:text-base">
                {tasks.length === 0 
                  ? "Create your first task to get started!" 
                  : "Try adjusting your search or filters."}
              </p>
              {tasks.length === 0 && (
                <Button onClick={() => setShowTaskForm(true)} className="gradient-btn">
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Task
                </Button>
              )}
            </div>
          ) : (
            filteredTasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={() => toggleTaskCompletion(task.id)}
                onEdit={() => {
                  setEditingTask(task);
                  setShowTaskForm(true);
                }}
                onDelete={() => deleteTask(task.id)}
                isOverdue={isTaskOverdue(task.deadline)}
                isDueSoon={isTaskDueSoon(task.deadline)}
                animationDelay={index * 0.1}
              />
            ))
          )}
        </div>

        {/* Task Form Modal */}
        {showTaskForm && (
          <TaskForm
            task={editingTask}
            categories={categories}
            onSubmit={(taskData) => {
              if (editingTask) {
                updateTask(editingTask.id, taskData);
              } else {
                addTask(taskData);
              }
              setShowTaskForm(false);
              setEditingTask(null);
            }}
            onClose={() => {
              setShowTaskForm(false);
              setEditingTask(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
