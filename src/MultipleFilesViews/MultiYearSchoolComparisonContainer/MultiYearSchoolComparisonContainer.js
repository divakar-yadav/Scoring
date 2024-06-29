import React, { useState } from 'react';
import './MultiYearSchoolComparisonContainer.css';
import MultiYearSchoolComparison from '../MultiYearSchoolComparison/MultiYearSchoolComparison';

const MultiYearSchoolComparisonContainer = ({ schools }) => {
  const [selectedSchool1, setSelectedSchool1] = useState(null);
  const [selectedSchool2, setSelectedSchool2] = useState(null);
  const [currentYearSchool1, setCurrentYearSchool1] = useState('2022-23');
  const [currentYearSchool2, setCurrentYearSchool2] = useState('2022-23');

  // Filter data by the selected year
  const filterDataByYear = (data, year) => {
    return data.find(innerArray => innerArray[0] && innerArray[0]['School Year'] === year) || [];
  };

  const handleSelectSchool1 = (event) => {
    const schl = event.target.value;
    const filteredData = filterDataByYear(schools, currentYearSchool1);
    console.log('Filtered Data School 1:', filteredData); // Debugging statement
    const selectedSchool = filteredData.find(school => school['School Name'] === schl);
    console.log('Selected School 1:', selectedSchool); // Debugging statement
    setSelectedSchool1(selectedSchool);
  };

  const handleSelectSchool2 = (event) => {
    const schl = event.target.value;
    const filteredData = filterDataByYear(schools, currentYearSchool2);
    console.log('Filtered Data School 2:', filteredData); // Debugging statement
    const selectedSchool = filteredData.find(school => school['School Name'] === schl);
    console.log('Selected School 2:', selectedSchool); // Debugging statement
    setSelectedSchool2(selectedSchool);
  };

  const getUniqueYears = (data) => {
    const yearsSet = new Set();
    data.forEach(innerArray => {
      innerArray.forEach(school => {
        yearsSet.add(school['School Year']);
      });
    });
    return Array.from(yearsSet);
  };

  const uniqueYears = getUniqueYears(schools);

  return (
    <div className="school-comparison-container">
      <h2>Compare Schools</h2>
      <div className='school-comparison-calculator-year-filter-container'>
        <div className='school-comparison-calculator-year-filter'>
          {uniqueYears.map((item) => (
            <div
              key={item}
              onClick={() => {
                setCurrentYearSchool1(item);
                setSelectedSchool1(null); // Reset selection on year change
                console.log('Current Year School 1:', item); // Debugging statement
              }}
              className='eligibility-calculator-year-filter-year'
              style={currentYearSchool1 === item ? { backgroundColor: '#3e4ee1', color: '#fff', fontWeight:600 } : null}
            >
              {item}
            </div>
          ))}
        </div>
        <div className='school-comparison-calculator-year-filter'>
          {uniqueYears.map((item) => (
            <div
              key={item}
              onClick={() => {
                setCurrentYearSchool2(item);
                setSelectedSchool2(null); // Reset selection on year change
                console.log('Current Year School 2:', item); // Debugging statement
              }}
              className='eligibility-calculator-year-filter-year'
              style={currentYearSchool2 === item ? { backgroundColor: '#3e4ee1', color: '#fff' } : null}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="search-boxes">
        <div className="search-box">
          <label>Select School 1</label>
          <input type="text" list="schools1" onChange={handleSelectSchool1} />
          <datalist id="schools1">
            {filterDataByYear(schools, currentYearSchool1).map(school => (
              <option key={school['School Code']} value={school['School Name']} />
            ))}
          </datalist>
        </div>
        <div className="search-box">
          <label>Select School 2</label>
          <input type="text" list="schools2" onChange={handleSelectSchool2} />
          <datalist id="schools2">
            {filterDataByYear(schools, currentYearSchool2).map(school => (
              <option key={school['School Code']} value={school['School Name']} />
            ))}
          </datalist>
        </div>
      </div>
      {selectedSchool1 && selectedSchool2 && (
        <MultiYearSchoolComparison school1={selectedSchool1} school2={selectedSchool2} />
      )}
    </div>
  );
};

export default MultiYearSchoolComparisonContainer;
