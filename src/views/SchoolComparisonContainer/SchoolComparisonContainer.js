import React, { useState, useEffect } from 'react';
import SchoolComparison from '../SchoolComparison/SchoolComparison';
import './SchoolComparisonContainer.css';

const SchoolComparisonContainer = ({ schools, setHideFilters }) => {
  const [selectedSchool1, setSelectedSchool1] = useState(null);
  const [selectedSchool2, setSelectedSchool2] = useState(null);


  useEffect(()=>{
    setHideFilters(true)

    return () => {
        setHideFilters(false)

      };
    })

  const handleSelectSchool1 = (event) => {
    const schoolName = event.target.value;
    const school = schools.find(school => school['School Name'] === schoolName);
    setSelectedSchool1(school);
  };

  const handleSelectSchool2 = (event) => {
    const schoolName = event.target.value;
    const school = schools.find(school => school['School Name'] === schoolName);
    setSelectedSchool2(school);
  };

  return (
    <div className="school-comparison-container">
      <h2>Compare Schools</h2>
      <div className="search-boxes">
        <div className="search-box">
          <label>Select School 1</label>
          <input type="text" list="schools" onChange={handleSelectSchool1} />
          <datalist id="schools">
            {schools.map(school => (
              <option key={school['School Code']} value={school['School Name']} />
            ))}
          </datalist>
        </div>
        <div className="search-box">
          <label>Select School 2</label>
          <input type="text" list="schools" onChange={handleSelectSchool2} />
          <datalist id="schools">
            {schools.map(school => (
              <option key={school['School Code']} value={school['School Name']} />
            ))}
          </datalist>
        </div>
      </div>
      {selectedSchool1 && selectedSchool2 && (
        <SchoolComparison school1={selectedSchool1} school2={selectedSchool2} />
      )}
    </div>
  );
};

export default SchoolComparisonContainer;