import React, { useState } from 'react';
import './TodoInput.css';

const PRIORITIES = [
  { value: 'high',   label: '🔴 High',   color: '#f87171' },
  { value: 'medium', label: '🟡 Medium', color: '#fbbf24' },
  { value: 'low',    label: '🟢 Low',    color: '#4ade80' },
];

function TodoInput({ onAdd }) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text, priority);
    setText('');
  };

  return (
    <form className="todo-input-form" onSubmit={handleSubmit}>
      <div className="input-row">
        <input
          className="todo-input"
          type="text"
          placeholder=""
          value={text}
          onChange={e => setText(e.target.value)}
          autoFocus
        />
        <button className="add-btn" type="submit" disabled={!text.trim()}>
          <span className="add-btn-icon">+</span>
          <span className="add-btn-text">Add</span>
        </button>
      </div>
      <div className="priority-row">
        <span className="priority-label">Priority:</span>
        {PRIORITIES.map(p => (
          <button
            key={p.value}
            type="button"
            className={`priority-btn ${priority === p.value ? 'active' : ''}`}
            style={{ '--p-color': p.color }}
            onClick={() => setPriority(p.value)}
          >
            {p.label}
          </button>
        ))}
      </div>
    </form>
  );
}

export default TodoInput;
