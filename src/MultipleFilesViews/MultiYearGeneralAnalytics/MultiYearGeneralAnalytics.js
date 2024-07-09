import React, { useEffect, useState } from 'react';
import './MultiYearGeneralAnalytics.css';
import ColumnChart from '../../components/ColumnChart/ColumnChart';

const MultiYearGeneralAnalytics = ({ data, setHideFilters }) => {
  const [currentYear, setCurrentYear] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const initialYear = data[0][0]?.['School Year'];
      setCurrentYear(initialYear);
    }
  }, [data]);


  useEffect(()=>{
    setHideFilters(true)

    return () => {
        setHideFilters(false)

      };
    }
)

  useEffect(() => {
    if (currentYear) {
      const yearData = data.find(yearArray => yearArray[0]?.['School Year'] === currentYear);
      setFilteredData(yearData || []);
    }
  }, [currentYear, data]);

  const uniqueYears = Array.from(new Set(data.flat().map(item => item['School Year'])));

  const calculateAverageScores = (data, scoreKey) => {
    const yearScores = {};
    data.flat().forEach(item => {
      const year = item['School Year'];
      if (!yearScores[year]) {
        yearScores[year] = { total: 0, count: 0 };
      }
      yearScores[year].total += item[scoreKey];
      yearScores[year].count += 1;
    });
    return Object.keys(yearScores).map(year => ({
      year,
      average: yearScores[year].total / yearScores[year].count
    }));
  };

  const getHighestScoreSchools = (data, scoreKey) => {
    const highestSchools = {};
    data.flat().forEach(item => {
      const year = item['School Year'];
      if (!highestSchools[year] || item[scoreKey] > highestSchools[year][scoreKey]) {
        highestSchools[year] = item;
      }
    });
    return Object.values(highestSchools);
  };

  const averageDPIScores = calculateAverageScores(data, 'Overall Accountability Score');
  const averageWeightedScores = calculateAverageScores(data, 'nonlinear');
  const highestDPIScoreSchools = getHighestScoreSchools(data, 'Overall Accountability Score');
  const highestWeightedScoreSchools = getHighestScoreSchools(data, 'nonlinear').slice(-5);

  const averageDPICategories = averageDPIScores.map(item => item.year);
  const averageDPIData = averageDPIScores.map(item => item.average);

  const averageWeightedCategories = averageWeightedScores.map(item => item.year);
  const averageWeightedData = averageWeightedScores.map(item => item.average);

  const highestDPICategories = highestDPIScoreSchools.map(item => item['School Year']);
  const highestDPIData = highestDPIScoreSchools.map(item => item['Overall Accountability Score']);

  const highestWeightedCategories = highestWeightedScoreSchools.map(item => item['School Year']);
  const highestWeightedData = highestWeightedScoreSchools.map(item => item['nonlinear']);

  return (
    <div className='general-analytics'>
      <ColumnChart
        title={'Average of Weighted Scores moving with years.'}
        categories={averageWeightedCategories}
        seriesData={[{ name: 'Weighted Scores', data: averageWeightedData }]}
      />
      <ColumnChart
        title={'Average of DPI Scores moving with years.'}
        categories={averageDPICategories}
        seriesData={[{ name: 'DPI Scores', data: averageDPIData }]}
      />
     <ColumnChart
        title={'School with Highest Weighted Score in Past 5 years.'}
        categories={highestWeightedCategories}
        seriesData={[{ name: 'Weighted Score', data: highestWeightedData }]}
      />
      <ColumnChart
        title={'School with Highest DPI Score in Past years.'}
        categories={highestDPICategories}
        seriesData={[{ name: 'DPI Score', data: highestDPIData }]}
      />
    </div>
  );
};

export default MultiYearGeneralAnalytics;
