import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const SubjectProficiencyChart = () => {
  const options = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Subject Proficiency'
    },
    xAxis: {
      categories: ['Math', 'Reading'],
      crosshair: true
    },
    yAxis: {
      min: 0,
      max: 100,
      title: {
        text: 'Percentage'
      },
      labels: {
        format: '{value}%'
      }
    },
    credits: {
        enabled: false
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
    series: [{
      name: 'School',
      data: [12, 8],
      color: '#1f77b4'
    }, {
      name: 'District',
      data: [9, 13],
      color: '#4C9EDF'
    }, {
      name: 'State',
      data: [37, 36],
      color: '#ADD8E6'
    }]
  };

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <div>
          <span style={{ color: '#1f77b4', fontSize: '14px', marginRight: '10px' }}>■ School</span>
          <span style={{ color: '#4C9EDF', fontSize: '14px', marginRight: '10px' }}>■ District</span>
          <span style={{ color: '#ADD8E6', fontSize: '14px' }}>■ State</span>
        </div>
      </div>
    </div>
  );
};

export default SubjectProficiencyChart;
