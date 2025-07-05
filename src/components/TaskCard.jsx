
import { CheckCircle, Circle, Edit3, Trash2, Calendar, Clock, AlertCircle, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const TaskCard = ({ 
  task, 
  onToggleComplete, 
  onEdit, 
  onDelete, 
  isOverdue, 
  isDueSoon, 
  animationDelay = 0 
}) => {
  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Work': 'bg-blue-100 text-blue-800',
      'Personal': 'bg-green-100 text-green-800',
      'Learning': 'bg-purple-100 text-purple-800',
      'Health': 'bg-pink-100 text-pink-800',
      'Finance': 'bg-orange-100 text-orange-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card 
      className={`glass-card hover:scale-105 transition-all duration-300 animate-slideUp ${
        task.completed ? 'opacity-75' : ''
      } ${isOverdue && !task.completed ? 'ring-2 ring-red-400' : ''}`}
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2 flex-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleComplete}
              className="h-6 w-6 p-0 hover:bg-white/20"
            >
              {task.completed ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <Circle className="h-5 w-5 text-gray-400" />
              )}
            </Button>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`} />
              {(isOverdue && !task.completed) && (
                <AlertCircle className="h-4 w-4 text-red-500" />
              )}
            </div>
          </div>
          
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={onEdit}
              className="h-6 w-6 p-0 hover:bg-white/20"
            >
              <Edit3 className="h-3 w-3 text-gray-500" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onDelete}
              className="h-6 w-6 p-0 hover:bg-white/20 hover:text-red-500"
            >
              <Trash2 className="h-3 w-3 text-gray-500" />
            </Button>
          </div>
        </div>

        {/* Title */}
        <h3 className={`font-semibold text-gray-800 mb-2 ${
          task.completed ? 'line-through text-gray-500' : ''
        }`}>
          {task.title}
        </h3>

        {/* Description */}
        {task.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {task.description}
          </p>
        )}

        {/* Category */}
        {task.category && (
          <div className="mb-3">
            <Badge className={`text-xs ${getCategoryColor(task.category)}`}>
              {task.category}
            </Badge>
          </div>
        )}

        {/* Deadline */}
        {task.deadline && (
          <div className={`flex items-center gap-1 text-xs ${
            isOverdue && !task.completed 
              ? 'text-red-600' 
              : isDueSoon && !task.completed 
              ? 'text-orange-600' 
              : 'text-gray-500'
          }`}>
            <Calendar className="h-3 w-3" />
            <span>{formatDate(task.deadline)}</span>
            {isDueSoon && !task.completed && !isOverdue && (
              <Badge variant="outline" className="ml-1 text-xs border-orange-300 text-orange-600">
                Due Soon
              </Badge>
            )}
          </div>
        )}

        {/* Priority indicator */}
        <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/20">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Flag className="h-3 w-3" />
            <span className="capitalize">{task.priority} Priority</span>
          </div>
          
          {task.completed && (
            <Badge variant="outline" className="text-xs border-green-300 text-green-600">
              Completed
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
