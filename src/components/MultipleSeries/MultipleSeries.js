import React from 'react';
import Highcharts from 'highcharts';
import "./MultipleSeries.css";
import HighchartsReact from 'highcharts-react-official';

const MultipleSeries = (props) => {
    const {width, height, calculatedData} = props;
    const seriesData = calculatedData.map((row)=>{
        return {
            name: row.school_name,
            data: row.dpi_score.data

        }
    })
    console.log(seriesData,"0-seriesData")
    const options = {
        chart: {
            height: 1800,  // Make sure the chart adapts to the container height
            width: width    // Make sure the chart adapts to the container width
        },
        title: {
            text: ''
        },
        // xAxis: {
        //     categories: row.weighted_score.years
        // },
        yAxis: {
            title: {
                text: 'Score'
            }
        },
        credits: {
            enabled: false
          },
        series: seriesData,
        
    };

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};

export default MultipleSeries;
