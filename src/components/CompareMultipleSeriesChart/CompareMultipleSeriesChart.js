import React from 'react';
import Highcharts from 'highcharts';
import "./CompareMultipleSeriesChart.css";
import HighchartsReact from 'highcharts-react-official';
import { propEach } from '@turf/turf';

const CompareMultipleSeriesChart = (props) => {
    const {width, height, row} = props;
    const options = {
        chart: {
            height: height,  // Make sure the chart adapts to the container height
            width: width    // Make sure the chart adapts to the container width
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: row.weighted_score.years
        },
        yAxis: {
            title: {
                text: 'Score'
            }
        },
        credits: {
            enabled: false
          },
        series: [
            {
                name: 'DPI Score',
                data: row.dpi_score.data
            },
            {
                name: 'Weighted Score',
                data: row.weighted_score.data
            }
        ]
    };

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};

export default CompareMultipleSeriesChart;
