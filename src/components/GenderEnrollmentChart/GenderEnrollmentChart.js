import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const GenderEnrollmentChart = () => {
  const options = {
    chart: {
      type: 'bar'
    },
    title: {
      text: 'Enrollment by Gender'
    },
    xAxis: {
      categories: [''],
      title: {
        text: null
      }
    },
    yAxis: {
      min: 0,
      max: 100,
      title: {
        text: '',
        align: 'high'
      },
      labels: {
        overflow: 'justify'
      }
    },
    tooltip: {
      valueSuffix: ' %'
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true
        }
      }
    },
    legend: {
      layout: 'horizontal',
      align: 'center',
      verticalAlign: 'bottom',
      x: 0,
      y: 0,
      floating: false,
      borderWidth: 1,
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
      shadow: false
    },
    credits: {
      enabled: false
    },
    series: [{
      name: 'Female',
      data: [48],
      color: '#1f77b4'
    }, {
      name: 'Male',
      data: [52],
      color: '#2ca02c'
    }]
  };

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>
  );
};

export default GenderEnrollmentChart;
