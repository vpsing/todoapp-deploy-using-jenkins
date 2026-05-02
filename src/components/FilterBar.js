import React from 'react';
import './FilterBar.css';

function FilterBar({ filter, setFilter, sortBy, setSortBy, searchQuery, setSearchQuery, onClearCompleted, hasCompleted }) {
  return (
    <div className="filter-bar">
      <div className="search-wrap">
        <span className="search-icon">🔍</span>
        <input
          className="search-input"
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button className="search-clear" onClick={() => setSearchQuery('')}>✕</button>
        )}
      </div>

      <div className="filter-controls">
        <div className="filter-tabs">
          {['all', 'active', 'completed'].map(f => (
            <button
              key={f}
              className={`filter-tab ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? 'All' : f === 'active' ? 'Active' : 'Done'}
            </button>
          ))}
        </div>

        <select
          className="sort-select"
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
        >
          <option value="newest">↓ Newest</option>
          <option value="oldest">↑ Oldest</option>
          <option value="priority">⚡ Priority</option>
        </select>

        {hasCompleted && (
          <button className="clear-btn" onClick={onClearCompleted}>
            🗑 Clear Done
          </button>
        )}
      </div>
    </div>
  );
}

export default FilterBar;
