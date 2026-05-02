import React, { useState } from 'react';
import './TodoItem.css';

const PRIORITY_META = {
  high:   { label: 'High',   color: '#f87171', dot: '🔴' },
  medium: { label: 'Medium', color: '#fbbf24', dot: '🟡' },
  low:    { label: 'Low',    color: '#4ade80', dot: '🟢' },
};

function formatTime(ts) {
  const now = Date.now();
  const diff = Math.floor((now - ts) / 1000);
  if (diff < 60) return 'Abhi';
  if (diff < 3600) return `${Math.floor(diff / 60)}m pehle`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h pehle`;
  return `${Math.floor(diff / 86400)}d pehle`;
}

function TodoItem({ todo, index, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [removing, setRemoving] = useState(false);

  const meta = PRIORITY_META[todo.priority] || PRIORITY_META.medium;

  const handleDelete = () => {
    setRemoving(true);
    setTimeout(() => onDelete(todo.id), 280);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEdit(todo.id, editText);
    setEditing(false);
  };

  const handleEditKeyDown = (e) => {
    if (e.key === 'Escape') {
      setEditText(todo.text);
      setEditing(false);
    }
  };

  return (
    <div
      className={`todo-item ${todo.completed ? 'done' : ''} ${removing ? 'removing' : ''}`}
      style={{ animationDelay: `${index * 0.04}s`, '--p-color': meta.color }}
    >
      <div className="todo-left">
        <button
          className={`check-btn ${todo.completed ? 'checked' : ''}`}
          onClick={() => onToggle(todo.id)}
          aria-label="Toggle complete"
        >
          {todo.completed && <span className="check-mark">✓</span>}
        </button>

        <div className="todo-content">
          {editing ? (
            <form onSubmit={handleEditSubmit} className="edit-form">
              <input
                className="edit-input"
                value={editText}
                onChange={e => setEditText(e.target.value)}
                onKeyDown={handleEditKeyDown}
                autoFocus
                onBlur={handleEditSubmit}
              />
            </form>
          ) : (
            <span
              className="todo-text"
              onDoubleClick={() => !todo.completed && setEditing(true)}
            >
              {todo.text}
            </span>
          )}

          <div className="todo-meta">
            <span className="priority-badge" style={{ color: meta.color }}>
              {meta.dot} {meta.label}
            </span>
            <span className="todo-time">{formatTime(todo.createdAt)}</span>
          </div>
        </div>
      </div>

      <div className="todo-actions">
        {!todo.completed && (
          <button
            className="action-btn edit-btn"
            onClick={() => setEditing(!editing)}
            title="Edit"
          >
            ✏️
          </button>
        )}
        <button
          className="action-btn delete-btn"
          onClick={handleDelete}
          title="Delete"
        >
          🗑
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
