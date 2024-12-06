import React, { useState } from 'react';
import './App.css';

function App() {
  const [isExpanded, setIsExpanded] = useState(false);

  const historyItems = [
    {
      title: "SELECT * FROM users",
      status: "Success",
      time: "2024-03-20 14:30:00"
    },
    {
      title: "INSERT INTO table_name VALUES (...)",
      status: "Failed",
      time: "2024-03-20 14:25:00"
    }
  ];

  return (
    <div className="App">
      <div className="expandable-list">
        <div 
          className={`list-header ${isExpanded ? 'expanded' : ''}`}
          onClick={() => setIsExpanded(!isExpanded)}
          style={{ 
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ddd'
          }}
        >
          <span className="triangle"></span>
          <span>History</span>
          <span> ({historyItems.length})</span>
        </div>
        {isExpanded && (
          <div className="list-content" style={{
            border: '1px solid #ddd',
            borderTop: 'none',
            borderRadius: '0 0 4px 4px'
          }}>
            {historyItems.map((item, index) => (
              <div className="list-item" key={index}>
                <div className="item-header">
                  <span className="item-title">{item.title}</span>
                  <button className="copy-button">Copy SQL</button>
                </div>
                <div className="item-footer">
                  <span className="item-status">{item.status}</span>
                  <span className="item-time">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
