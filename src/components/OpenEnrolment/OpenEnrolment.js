import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
import SolidGauge from 'highcharts/modules/solid-gauge';
import './OpenEnrolment.css';

HighchartsMore(Highcharts);
SolidGauge(Highcharts);

const OpenEnrolment = ({ row }) => {
  // Extract the relevant value from the row and convert to percentage
  const disabilitiesPercent = parseFloat((row["Percent English Learners"] * 100).toFixed(2));

  const options = {
    chart: {
      type: 'solidgauge'
    },
    title: {
      text: ''
    },
    pane: {
      startAngle: 0,
      endAngle: 360,
      background: [{
        outerRadius: '100%',
        innerRadius: '85%',
        backgroundColor: Highcharts.color('#EEE').get(),
        borderWidth: 0
      }]
    },
    tooltip: {
      enabled: false
    },
    yAxis: {
      min: 0,
      max: 100,
      stops: [[1, '#ff5733']],  // Different color for this chart
      lineWidth: 0,
      tickWidth: 0,
      minorTickInterval: null,
      tickAmount: 2,
      labels: {
        y: 16
      }
    },
    plotOptions: {
      solidgauge: {
        dataLabels: {
          y: -20,
          borderWidth: 0,
          useHTML: true
        },
        linecap: 'round',
        stickyTracking: false,
        rounded: true
      }
    },
    credits: {
      enabled: false
    },
    series: [{
      name: 'Students with Disabilities',
      data: [{
        color: '#ff5733',  // Different color for this chart
        radius: '100%',
        innerRadius: '85%',
        y: disabilitiesPercent
      }],
      dataLabels: {
        format: '<div style="text-align:center"><span style="font-size:25px">{y}%</span></div>'
      }
    }]
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }} className='open_enrolment'>
      <div style={{ width: '200px', height: '200px' }}>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
        />
      </div>
      <div style={{ marginLeft: '20px', fontSize: '20px' }}>
      Open Enrolment
      </div>
    </div>
  );
};

export default OpenEnrolment;
