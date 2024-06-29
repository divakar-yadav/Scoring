import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './ColumnChart.css';

const ColumnChart = ({ title, categories, seriesData }) => {
    const colors = ['#7cb5ec', '#434348']; // Define two colors for alternate columns

    const seriesWithColors = seriesData.map(series => ({
        ...series,
        data: series.data.map((value, index) => ({
            y: value,
            color: colors[index % colors.length]
        }))
    }));

    const lineSeriesData = seriesData[0].data; // Assuming we want the line series to follow the first series data

    const options = {
        chart: {
            type: 'column'
        },
        title: {
            text: title,
            align: 'left'
        },
        subtitle: {
            align: 'left'
        },
        xAxis: {
            categories: categories,
            crosshair: true,
            accessibility: {
                description: 'Years'
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Scores'
            }
        },
        tooltip: {
            valueSuffix: ' points'
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        credits: {
            enabled: false // Disable Highcharts credits
        },
        series: [
            ...seriesWithColors,
            {
                type: 'line',
                name: 'Trend Line',
                data: lineSeriesData,
                marker: {
                    enabled: false
                },
                dashStyle: 'ShortDash',
                color: '#FF0000'
            }
        ]
    };

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};

export default ColumnChart;
