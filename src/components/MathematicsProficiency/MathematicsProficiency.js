import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const MathematicsProficiency = ({ row }) => {
  // Extract the relevant values from the row
  const categories = ['2021', '2022', '2023'];
  const schoolValues = [
    parseFloat((row["School Percent Proficient Mathematics 2021"] * 100).toFixed(2)),
    parseFloat((row["School Percent Proficient Mathematics 2022"] * 100).toFixed(2)),
    parseFloat((row["School Percent Proficient Mathematics 2023"] * 100).toFixed(2))
  ];
  const stateValues = [
    parseFloat((row["State Percent Proficient Mathematics 2021"] * 100).toFixed(2)),
    parseFloat((row["State Percent Proficient Mathematics 2022"] * 100).toFixed(2)),
    parseFloat((row["State Percent Proficient Mathematics 2023"] * 100).toFixed(2))
  ];

  const options = {
    chart: {
      type: 'column'
    },
    title: {
      text: ''
    },
    xAxis: {
      categories: categories,
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'In Percent %'
      },
      labels: {
        format: '{value}%'
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y}%</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name: 'School Percent Proficient',
        data: schoolValues,
        color: '#1f77b4'
      },
      {
        name: 'State Percent Proficient',
        data: stateValues,
        color: '#ff7f0e'
      }
    ]
  };

  return (
    <div className='MathematicsProficiency'>
      <div className='MathematicsProficiency_title'>
      School vs State Percent Proficient Mathematics
      </div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>
  );
};

export default MathematicsProficiency;
