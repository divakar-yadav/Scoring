import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './GeneralAnalytics.css';

const GeneralAnalytics = ({ data, setHideFilters, mapping }) => {



    useEffect(()=>{
        setHideFilters(true)

        return () => {
            setHideFilters(false)

          };
        }
)

// recent bug fix on 8 Dec 2024

// 1- School Achievement Score --> Achievement Score [Done]
// 2- School Growth Score --> Growth Score [Done]
// 3- School Percent Proficient ELA 2023 --> Percent Proficient ELA 2023
// 4- School Percent Proficient Mathematics 2023 --> Percent Proficient Mathematics 2023
console.log(data, "-----data-----")
console.log(mapping, "-----mapping-----")

    const getTooltipInfo = (row) => `
    <b>School Name:</b> ${row['School Name']}<br>
    <b>School Type:</b> ${row['School Type']}<br>
    <b>Enrollment:</b> ${row['School Enrollment']}<br>
    <b>American Indian or Alaskan Native:</b> ${(row['Percent American Indian or Alaskan Native'] * 100).toFixed(2)}%<br>
    <b>Asian:</b> ${(row['Percent Asian'] * 100).toFixed(2)}%<br>
    <b>Black or African American:</b> ${(row['Percent Black or African American'] * 100).toFixed(2)}%<br>
    <b>Hispanic/Latino:</b> ${(row['Percent Hispanic/Latino'] * 100).toFixed(2)}%<br>
    <b>Native Hawaiian or Other Pacific Islander:</b> ${(row['Percent Native Hawaiian or Other Pacific Islander'] * 100).toFixed(2)}%<br>
    <b>White:</b> ${(row['Percent White'] * 100).toFixed(2)}%<br>
    <b>Two or More Races:</b> ${(row['Percent Two or More Races'] * 100).toFixed(2)}%<br>
    <b>City:</b> ${row['City']}
`;
    // Chart 1: Overall Accountability Score vs. School Enrollment
    const chart1Options = {
        chart: {
            type: 'scatter',
            zoomType: 'xy'
        },
        title: {
            text: 'Overall Accountability Score vs. School Enrollment'
        },
        xAxis: {
            title: {
                enabled: true,
                text: 'School Enrollment'
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true
        },
        yAxis: {
            title: {
                text: 'Overall Accountability Score'
            }
        },
        tooltip: {
            useHTML: true,
            formatter: function () {
                const row = data.find(item => item['School Enrollment'] === this.x && item['Overall Accountability Score'] === this.y);
                return getTooltipInfo(row);
            }
        },
        credits: {
            enabled: false // Disable Highcharts credits
        },
        series: [{
            name: 'Schools',
            color: 'rgba(223, 83, 83, .5)',
            data: data.map(item => [item['School Enrollment'], item['Overall Accountability Score']])
        }]
    };

    // Chart 2: School Achievement Score vs. School Growth Score
    const chart2Options = {
        chart: {
            type: 'scatter',
            zoomType: 'xy'
        },
        title: {
            text: 'School Achievement Score vs. School Growth Score'
        },
        xAxis: {
            title: {
                enabled: true,
                text: 'School Achievement Score'
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true
        },
        yAxis: {
            title: {
                text: 'School Growth Score'
            }
        },
        credits: {
            enabled: false // Disable Highcharts credits
        },
        series: [{
            name: 'Schools',
            color: 'rgba(119, 152, 191, .5)',
            data: data.map(item => [item[mapping['School Achievement Score']], item[mapping['School Growth Score']]])
        }]
    };

  
    // Chart 3: Percent Proficient ELA vs. Percent Proficient Mathematics (for the year 2023)
    const chart3Options = {
        chart: {
            type: 'scatter',
            zoomType: 'xy'
        },
        title: {
            text: 'Percent Proficient ELA vs. Percent Proficient Mathematics (2023)'
        },
        xAxis: {
            title: {
                enabled: true,
                text: 'Percent Proficient ELA (2023)'
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true
        },
        yAxis: {
            title: {
                text: 'Percent Proficient Mathematics (2023)'
            }
        },
        credits: {
            enabled: false // Disable Highcharts credits
        },
        series: [{
            name: 'Schools',
            color: 'rgba(34, 34, 34, .5)',
            data: data.map(item => [item[mapping['School Percent Proficient ELA 2023']], item[ mapping['School Percent Proficient Mathematics 2023']]])
        }]
    };
   
   
    // Chart 4: School Type Distribution
    const schoolTypeCounts = data.reduce((acc, item) => {
        acc[item['School Type']] = (acc[item['School Type']] || 0) + 1;
        return acc;
    }, {});
    const chart4Options = {
        chart: {
            type: 'pie'
        },
        title: {
            text: 'School Type Distribution'
        },
        credits: {
            enabled: false // Disable Highcharts credits
        },
        series: [{
            name: 'Count',
            colorByPoint: true,
            data: Object.entries(schoolTypeCounts).map(([name, y]) => ({ name, y }))
        }]
    };

    // Chart 5: Locale Description Distribution
    const localeCounts = data.reduce((acc, item) => {
        acc[item['Locale description']] = (acc[item['Locale description']] || 0) + 1;
        return acc;
    }, {});
    const chart5Options = {
        chart: {
            type: 'pie'
        },
        title: {
            text: 'Locale Description Distribution'
        },
        credits: {
            enabled: false // Disable Highcharts credits
        },
        series: [{
            name: 'Count',
            colorByPoint: true,
            data: Object.entries(localeCounts).map(([name, y]) => ({ name, y }))
        }]
    };

    return (
        <div className='general-analytics'>
            <HighchartsReact highcharts={Highcharts} options={chart1Options} />
            <HighchartsReact highcharts={Highcharts} options={chart2Options} />
            <HighchartsReact highcharts={Highcharts} options={chart3Options} />
            <HighchartsReact highcharts={Highcharts} options={chart4Options} />
            <HighchartsReact highcharts={Highcharts} options={chart5Options} />
        </div>
    );
};

export default GeneralAnalytics;
