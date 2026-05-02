import React from 'react';
import './StatsBar.css';

function StatsBar({ stats }) {
  const percent = stats.total === 0 ? 0 : Math.round((stats.completed / stats.total) * 100);

  return (
    <div className="stats-bar">
      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-number">{stats.total}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-item stat-active">
          <span className="stat-number">{stats.active}</span>
          <span className="stat-label">Active</span>
        </div>
        <div className="stat-item stat-done">
          <span className="stat-number">{stats.completed}</span>
          <span className="stat-label">Done</span>
        </div>
        <div className="stat-item stat-percent">
          <span className="stat-number">{percent}%</span>
          <span className="stat-label">Complete</span>
        </div>
      </div>
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${percent}%` }}
          title={`${percent}% complete`}
        />
      </div>
    </div>
  );
}

export default StatsBar;
