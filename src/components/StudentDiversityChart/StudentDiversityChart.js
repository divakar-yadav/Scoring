import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
import SolidGauge from 'highcharts/modules/solid-gauge';

HighchartsMore(Highcharts);
SolidGauge(Highcharts);

const StudentDiversityChart = ({ row }) => {
  const categories = [
    {
      name: 'American Indian or Alaskan Native',
      color: '#FBB13C',
      value: row["Percent American Indian or Alaskan Native"] * 100
    },
    {
      name: 'Asian',
      color: '#2CA02C',
      value: row["Percent Asian"] * 100
    },
    {
      name: 'Black or African American',
      color: '#1F77B4',
      value: row["Percent Black or African American"] * 100
    },
    {
      name: 'Hispanic/Latino',
      color: '#FF7F0E',
      value: row["Percent Hispanic/Latino"] * 100
    },
    {
      name: 'Native Hawaiian or Other Pacific Islander',
      color: '#AEC7E8',
      value: row["Percent Native Hawaiian or Other Pacific Islander"] * 100
    },
    {
      name: 'White',
      color: '#7FDBFF',
      value: row["Percent White"] * 100
    },
    {
      name: 'Two or More Races',
      color: '#B10DC9',
      value: row["Percent Two or More Races"] * 100
    }
  ];

  const options = {
    chart: {
      type: 'solidgauge'
    },
    title: {
      text: 'Student Diversity'
    },
    pane: {
      startAngle: 0,
      endAngle: 360,
      background: categories.map((category, index) => ({
        outerRadius: `${112 - index * 25}%`,
        innerRadius: `${88 - index * 25}%`,
        backgroundColor: Highcharts.color(category.color).setOpacity(0.3).get(),
        borderWidth: 0
      }))
    },
    yAxis: {
      min: 0,
      max: 100,
      lineWidth: 0,
      tickPositions: []
    },
    plotOptions: {
      solidgauge: {
        dataLabels: {
          enabled: false
        },
        linecap: 'round',
        stickyTracking: false,
        rounded: true
      }
    },
    credits: {
      enabled: false
    },
    series: categories.map(category => ({
      name: category.name,
      data: [{
        color: category.color,
        radius: `${112 - categories.indexOf(category) * 25}%`,
        innerRadius: `${88 - categories.indexOf(category) * 25}%`,
        y: category.value
      }]
    }))
  };

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        {categories.map((category, index) => (
          <div key={index} style={{ textAlign: 'center', marginRight: '20px' }}>
            <span style={{ color: category.color, fontSize: '24px' }}>{category.value.toFixed(1)}%</span>
            <div style={{ color: '#4B4B4B' }}>{category.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDiversityChart;
