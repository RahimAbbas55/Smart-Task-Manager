# Smart Task Manager 📝

A modern, responsive task management application built with React and Vite. This prototype helps individuals stay productive by organizing tasks with deadlines, categories, and completion tracking.

## 🚀 Features

- **Task Management**: Add, edit, and delete tasks with ease
- **Deadline Tracking**: Set deadlines and get visual indicators for upcoming tasks
- **Category Organization**: Organize tasks by categories (Work, Personal, Learning, etc.)
- **Completion Tracking**: Mark tasks as completed with visual feedback
- **Smart Filtering**: Filter tasks by category, completion status, or deadline
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Local Storage**: Persist data across browser sessions

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **Vite** - Fast build tool and development server
- **CSS3** - Custom styling with modern features
- **JavaScript (ES6+)** - Modern JavaScript features

### Why This Stack?

1. **React + Vite**: 
   - Fast development experience with hot module replacement
   - Modern build tooling with optimized production builds
   - Component-based architecture for maintainable code

2. **Vanilla CSS**: 
   - Full control over styling without external dependencies
   - Lightweight and fast loading
   - Easy to customize and maintain

3. **Local Storage**: 
   - Simple data persistence without backend complexity
   - Instant data access and offline capability
   - Perfect for MVP/prototype development

## 🏗️ Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React)                         │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │   Task List     │  │   Add/Edit      │  │   Filters       │ │
│  │   Component     │  │   Task Form     │  │   Component     │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │   Task Item     │  │   Category      │  │   Deadline      │ │
│  │   Component     │  │   Manager       │  │   Tracker       │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│                    State Management                         │
│              (React useState & useEffect)                   │
├─────────────────────────────────────────────────────────────┤
│                    Local Storage                            │
│                 (Browser Storage API)                       │
└─────────────────────────────────────────────────────────────┘
```

### Data Schema

```javascript
// Task Object Structure
{
  id: string,              // Unique identifier (UUID)
  title: string,           // Task title
  description: string,     // Task description
  category: string,        // Category (Work, Personal, Learning, etc.)
  deadline: string,        // ISO date string
  completed: boolean,      // Completion status
  createdAt: string,       // Creation timestamp
  updatedAt: string        // Last update timestamp
}

// Categories Array
[
  "Work",
  "Personal", 
  "Learning",
  "Health",
  "Shopping",
  "Other"
]
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/smart-task-manager.git
   cd smart-task-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 🎯 Core Functionality

### Task Operations
- **Add Task**: Create new tasks with title, description, category, and deadline
- **Edit Task**: Update existing task details
- **Delete Task**: Remove tasks from the list
- **Toggle Completion**: Mark tasks as completed/incomplete

### Organization Features
- **Categories**: Group tasks by predefined categories
- **Filtering**: Filter by category, completion status, or deadline proximity
- **Sorting**: Sort tasks by creation date, deadline, or priority

### Deadline Management
- **Visual Indicators**: Color-coded deadlines (overdue, due soon, upcoming)
- **Deadline Tracking**: Display time remaining until deadline
- **Reminder System**: Visual cues for approaching deadlines

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🎨 UI/UX Features

- **Clean Interface**: Minimalist design focused on productivity
- **Responsive Layout**: Adapts to different screen sizes
- **Interactive Elements**: Hover effects and smooth transitions
- **Color Coding**: Visual indicators for task status and urgency
- **Form Validation**: Input validation with user feedback

## 🔮 Future Enhancements

### Phase 1 (Current)
- ✅ Basic CRUD operations
- ✅ Category management
- ✅ Local storage persistence
- ✅ Deadline tracking
- ✅ Filtering and sorting



## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.



---

**Built with ❤️ using React + Vite**
