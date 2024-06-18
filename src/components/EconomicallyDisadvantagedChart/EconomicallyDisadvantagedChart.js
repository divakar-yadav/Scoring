import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
import SolidGauge from 'highcharts/modules/solid-gauge';
import './EconomicallyDisadvantagedChart.css'


HighchartsMore(Highcharts);
SolidGauge(Highcharts);

const EconomicallyDisadvantagedChart = ({ row }) => {
  // Extract the relevant value from the row and convert to percentage
  const economicallyDisadvantagedPercent = parseFloat((row["Percent Economically Disadvantaged"] * 100).toFixed(2));

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
      background: {
        backgroundColor: '#EEE',
        innerRadius: '85%',
        outerRadius: '100%',
        shape: 'arc'
      }
    },
    tooltip: {
      enabled: false
    },
    yAxis: {
      min: 0,
      max: 100,
      stops: [[1, '#1f77b4']],
      lineWidth: 0,
      tickWidth: 0,
      minorTickInterval: null,
      tickAmount: 2,
      title: {
        y: -70
      },
      labels: {
        y: 16
      }
    },
    plotOptions: {
      solidgauge: {
        dataLabels: {
          y: 5,
          borderWidth: 0,
          useHTML: true
        }
      }
    },
    credits: {
      enabled: false
    },
    series: [{
      name: 'Economically Disadvantaged',
      data: [{
        color: '#1f77b4',
        radius: '100%',
        innerRadius: '85%',
        y: economicallyDisadvantagedPercent
      }],
      dataLabels: {
        format: '<div style="text-align:center"><span style="font-size:25px">{y}%</span></div>'
      }
    }]
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }} className='economically_disadvantaged'>
      <div style={{ marginLeft: '20px', fontSize: '20px' }} className='economically_disadvantaged_title'>
        Economically disadvantaged students
      </div>
      <div style={{ width: '200px', height: '200px' }}>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
        />
      </div>
    </div>
  );
};

export default EconomicallyDisadvantagedChart;
