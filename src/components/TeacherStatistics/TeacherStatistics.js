import React from 'react';
import './TeacherStatistics.css'; // Make sure to create this CSS file

const TeacherStatistics = ({ row }) => {
  return (
    <div className="teacher-statistics">
      <div className="stat-row">
        <div className="stat-label">School Achievement Score</div>
        <div className="stat-value">{row["School Achievement Score"]}</div>
      </div>
      <div className="stat-row">
        <div className="stat-label">School ELA Achievement Score</div>
        <div className="stat-value">{row["School ELA Achievement Score"]}%</div>
      </div>
      <div className="stat-row">
        <div className="stat-label">School Mathematics Achievement Score</div>
        <div className="stat-value">{row["School Mathematics Achievement Score"]}</div>
      </div>
      <div className="stat-row">
        <div className="stat-label">School Growth Score</div>
        <div className="stat-value">{row["School Growth Score"]}%</div>
      </div>
      <div className="stat-row">
        <div className="stat-label">School ELA Growth Score</div>
        <div className="stat-value">{row["School ELA Growth Score"]}</div>
      </div>
      <div className="stat-row">
        <div className="stat-label">School Mathematics Growth Score</div>
        <div className="stat-value">{row["School Mathematics Growth Score"]}</div>
      </div>      
      <div className="stat-row">
        <div className="stat-label">School Target Group Outcomes Score</div>
        <div className="stat-value">{row["School Target Group Outcomes Score"]}</div>
      </div>      
      <div className="stat-row">
        <div className="stat-label">School Target Group Achievement Score</div>
        <div className="stat-value">{row["School Target Group Achievement Score"]}</div>
      </div>      
      <div className="stat-row">
        <div className="stat-label">School Target Group Growth Score</div>
        <div className="stat-value">{row["School Target Group Growth Score"]}</div>
      </div>
    </div>
  );
};

export default TeacherStatistics;