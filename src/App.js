import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import FilterBar from './components/FilterBar';
import StatsBar from './components/StatsBar';

const STORAGE_KEY = 'taskflow_todos';

function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [
        { id: 1, text: 'Docker image build karo ✅', completed: true, priority: 'high', createdAt: Date.now() - 3600000 },
        { id: 2, text: 'Jenkins pipeline setup karo', completed: false, priority: 'high', createdAt: Date.now() - 1800000 },
        { id: 3, text: 'Docker Compose likhna hai', completed: false, priority: 'medium', createdAt: Date.now() - 900000 },
        { id: 4, text: 'React app deploy karo 🚀', completed: false, priority: 'low', createdAt: Date.now() },
      ];
    } catch { return []; }
  });

  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback((text, priority = 'medium') => {
    if (!text.trim()) return;
    setTodos(prev => [{
      id: Date.now(),
      text: text.trim(),
      completed: false,
      priority,
      createdAt: Date.now()
    }, ...prev]);
  }, []);

  const toggleTodo = useCallback((id) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  }, []);

  const deleteTodo = useCallback((id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  }, []);

  const editTodo = useCallback((id, newText) => {
    if (!newText.trim()) return;
    setTodos(prev => prev.map(t => t.id === id ? { ...t, text: newText.trim() } : t));
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(t => !t.completed));
  }, []);

  const filteredTodos = todos
    .filter(t => {
      if (filter === 'active') return !t.completed;
      if (filter === 'completed') return t.completed;
      return true;
    })
    .filter(t => t.text.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'newest') return b.createdAt - a.createdAt;
      if (sortBy === 'oldest') return a.createdAt - b.createdAt;
      const pOrder = { high: 0, medium: 1, low: 2 };
      return pOrder[a.priority] - pOrder[b.priority];
    });

  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    active: todos.filter(t => !t.completed).length,
  };

  return (
    <div className="app-wrapper">
      <div className="app-container">
        <header className="app-header">
          <div className="header-badge">DevOps Project 🚀</div>
          <h1 className="app-title">
            Task<span className="accent">Flow</span>
          </h1>
          <p className="app-subtitle">Apne kaam ko organize karo — React + Docker + Jenkins</p>
        </header>

        <StatsBar stats={stats} />

        <TodoInput onAdd={addTodo} />

        <FilterBar
          filter={filter}
          setFilter={setFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onClearCompleted={clearCompleted}
          hasCompleted={stats.completed > 0}
        />

        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />

        {filteredTodos.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">
              {filter === 'completed' ? '🏆' : searchQuery ? '🔍' : '✨'}
            </div>
            <p className="empty-title">
              {searchQuery ? 'Koi result nahi mila' : filter === 'completed' ? 'Abhi tak kuch complete nahi' : 'Sab clear hai!'}
            </p>
            <p className="empty-sub">
              {searchQuery ? 'Dusra search try karo' : filter === 'all' ? 'Upar se naya task add karo' : ''}
            </p>
          </div>
        )}

        <footer className="app-footer">
          <span>Made with ❤️ for DevOps Learning</span>
          <span className="footer-stack">React · Docker · Jenkins</span>
        </footer>
      </div>
    </div>
  );
}

export default App;
