import React from 'react';
import './CheckboxList.css';

const CheckboxList = ({ title, options, onCheckboxChange, checkedList, pipeline }) => {
  return (
    <div className="checkbox-list">
      {/* <h3 className="checkbox-list-title">{title}</h3> */}
      <ul className="checkbox-list-items">
        {options.map((option, index) => (
          <li key={index} className="checkbox-list-item">
            <label>
              <input 
                type="checkbox" 
                className="checkbox-input" 
                onChange={() => onCheckboxChange('schoolType', option)} 
                checked={checkedList.includes(option) || option ==='Pipeline Schools' && pipeline}
              />
              <span className="checkbox-label">{option}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CheckboxList;
