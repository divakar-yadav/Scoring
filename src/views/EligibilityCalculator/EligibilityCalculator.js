import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './EligibilityCalculator.css';

const EligibilityCalculator = ({ fileData, schoolNames , calculatedData}) => {
    const [chartOptions1, setChartOptions1] = useState({});
    useEffect(() => {
        if (fileData && schoolNames) {
            console.log(fileData,"------fileData-------")
            processData(fileData, schoolNames);
        }
    }, [fileData, schoolNames]);

    const processData = (data, schoolNames) => {
        const colors = {
            'Significantly Exceeds Expectations': 'green',
            'Exceeds Expectations': 'blue',
            'Meets Expectations': 'black',
            'Meets Few Expectations': 'pink',
            'Fails to Meet Expectations': 'red',
            'NR-DATA': 'gray'
        };

        const features = [
            'School Name', 'Overall Accountability Score', 'Overall Accountability Rating',
            'School Type', 'School Enrollment', 'School ELA Achievement Score',
            'School Mathematics Achievement Score', 'School ELA Growth Score',
            'School Mathematics Growth Score', 'School On-Track to Graduation Score',
            'Percent Economically Disadvantaged', 'Percent American Indian or Alaskan Native',
            'Percent Asian', 'Percent Black or African American', 'Percent Hispanic/Latino',
            'Percent Native Hawaiian or Other Pacific Islander', 'Percent White',
            'Percent Two or More Races', 'City'
        ];

        const filteredData = data.filter(row => {
            return features.every(feature => row[feature] !== null && row[feature] !== undefined && row[feature] !== 'NA');
        });
        console.log(filteredData,"------filteredData-------")

        const pipelineData = filteredData.filter(row => row['City'] === 'Milwaukee' || schoolNames.includes(row['School Name']));
        console.log(pipelineData,"------pipelineData-------")
        const uniqueData = pipelineData.filter((row, index, self) => index === self.findIndex(t => t['School Name'] === row['School Name']));
        console.log(uniqueData,"------uniqueData-------")
        const finalData = uniqueData.filter(row => row['Percent Economically Disadvantaged'] >= 0.5 || row['School Name'] === 'Golda Meir School');

        const rename = {
            'School ELA Achievement Score': "ELA_achievement",
            'School Mathematics Achievement Score': "math_achievement",
            'School ELA Growth Score': "ELA_growth",
            'School Mathematics Growth Score': "math_growth",
            'School On-Track to Graduation Score'  : "graduation"
        };

        const metric = Object.values(rename);

        const standardizedData = finalData.map(row => {
            const standardizedRow = { ...row };
            metric.forEach(key => {
                const mean = finalData.reduce((acc, cur) => acc + cur[key], 0) / finalData.length;
                const std = Math.sqrt(finalData.reduce((acc, cur) => acc + Math.pow(cur[key] - mean, 2), 0) / finalData.length);
                standardizedRow[`${key}_score`] = (row[key] - mean) / std;
            });
            return standardizedRow;
        });

        const f = (achievement, growth, ecd, graduation, k1 = 0.6, k2 = 0.3, k3=0.2) => {
            return 1 / (1 + Math.exp(-(k1 * achievement + k2 * growth * ecd + k3*graduation*ecd)));
        };

        const nonlinearData = standardizedData.map(row => {
            const achievement = (row['ELA_achievement_score'] + row['math_achievement_score']) / 2.0;
            const growth = (row['ELA_growth_score'] + row['math_growth_score']) / 2.0;
            const nonlinear = f(achievement, growth, row['Percent Economically Disadvantaged'], row['graduation_score']) * 100.0;
            return { ...row, nonlinear };
        });

        // const plotData = nonlinearData.filter(row => schoolNames.includes(row['School Name'])).map(row => ({
        //     x: row['Percent Economically Disadvantaged'] * 100,
        //     y: row['Overall Accountability Score'],
        //     color: colors[row['Overall Accountability Rating']],
        //     name: row['School Name'],
        //     additionalInfo: `
        //         <b>School Name:</b> ${row['School Name']}<br>
        //         <b>School Type:</b> ${row['School Type']}<br>
        //         <b>Enrollment:</b> ${row['School Enrollment']}<br>
        //         <b>American Indian or Alaskan Native:</b> ${(row['Percent American Indian or Alaskan Native'] * 100).toFixed(2)}%<br>
        //         <b>Asian:</b> ${(row['Percent Asian'] * 100).toFixed(2)}%<br>
        //         <b>Black or African American:</b> ${(row['Percent Black or African American'] * 100).toFixed(2)}%<br>
        //         <b>Hispanic/Latino:</b> ${(row['Percent Hispanic/Latino'] * 100).toFixed(2)}%<br>
        //         <b>Native Hawaiian or Other Pacific Islander:</b> ${(row['Percent Native Hawaiian or Other Pacific Islander'] * 100).toFixed(2)}%<br>
        //         <b>White:</b> ${(row['Percent White'] * 100).toFixed(2)}%<br>
        //         <b>Two or More Races:</b> ${(row['Percent Two or More Races'] * 100).toFixed(2)}%<br>
        //         <b>City:</b> ${row['City']}
        //     `
        // }));
        console.log(nonlinearData,"-----nonlinearData-----")
        const plotData1 = calculatedData.filter(row => schoolNames.includes(row['School Name'])).map(row => ({

            x: row['Percent Economically Disadvantaged'] * 100,
            y: row['Overall Accountability Score'],
            color: colors[row['Overall Accountability Rating']],
            name: row['School Name'],
            label: row['School Name'].charAt(0),
            additionalInfo: `
                <b>School Name:</b> ${row['School Name']}<br>
                <b>School Name:</b> ${row['School Type']}<br>
                <b>DPI Score:</b> ${row['Overall Accountability Score']}<br>
                <b>Nonlinear Score :</b> ${row['nonlinear']}<br>
                <b>Enrollment:</b> ${row['School Enrollment']}<br>
                <b>American Indian or Alaskan Native:</b> ${(row['Percent American Indian or Alaskan Native'] * 100).toFixed(2)}%<br>
                <b>Asian:</b> ${(row['Percent Asian'] * 100).toFixed(2)}%<br>
                <b>Black or African American:</b> ${(row['Percent Black or African American'] * 100).toFixed(2)}%<br>
                <b>Hispanic/Latino:</b> ${(row['Percent Hispanic/Latino'] * 100).toFixed(2)}%<br>
                <b>Native Hawaiian or Other Pacific Islander:</b> ${(row['Percent Native Hawaiian or Other Pacific Islander'] * 100).toFixed(2)}%<br>
                <b>White:</b> ${(row['Percent White'] * 100).toFixed(2)}%<br>
                <b>Two or More Races:</b> ${(row['Percent Two or More Races'] * 100).toFixed(2)}%<br>
                <b>City:</b> ${row['City']}
            `
        }));

        const plotData2 = nonlinearData.filter(row => schoolNames.includes(row['School Name'])).map(row => ({
            x: row['Percent Economically Disadvantaged'] * 100,
            y: row['average'],
            color: colors[row['Overall Accountability Rating']],
            name: row['School Name'],
            label: row['School Name'].charAt(0),
            additionalInfo: `
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
            `
        }));

        const options1 = {
            chart: {
                type: 'scatter',
                zoomType: 'xy'
            },
            title: {
                text: 'Accountability Score vs ECD Percentage with Rating Color Mapping'
            },
            xAxis: {
                title: {
                    enabled: true,
                    text: 'Percent Economically Disadvantaged'
                },
                startOnTick: true,
                endOnTick: true,
                showLastLabel: true,
                max: 100 // Set the maximum value for the x-axis
            },
            yAxis: {
                title: {
                    text: 'Accountability Score'
                }
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'top',
                x: 100,
                y: 70,
                floating: true,
                backgroundColor: Highcharts.defaultOptions.chart.backgroundColor,
                borderWidth: 1
            },
            plotOptions: {
                scatter: {
                    marker: {
                        radius: 5,
                        states: {
                            hover: {
                                enabled: true,
                                lineColor: 'rgb(100,100,100)'
                            }
                        }
                    },
                    states: {
                        hover: {
                            marker: {
                                enabled: false
                            }
                        }
                    },
                    tooltip: {
                        useHTML: true,
                        headerFormat: '<b>{point.label}</b><br>',
                        pointFormat: '<br>{point.additionalInfo}<br>'
                    }
                }
            },
            series: [{
                name: 'School Data',
                data: plotData1,
                showInLegend: false // Hide the "School Data" legend
            }],
            credits: {
                enabled: false // Disable Highcharts credits
            }
        };
        const options2 = {
            chart: {
                type: 'scatter',
                zoomType: 'xy'
            },
            title: {
                text: 'Average Score vs ECD Percentage with Rating Color Mapping'
            },
            xAxis: {
                title: {
                    enabled: true,
                    text: 'Percent Economically Disadvantaged'
                },
                startOnTick: true,
                endOnTick: true,
                showLastLabel: true,
                max: 100 // Set the maximum value for the x-axis
            },
            yAxis: {
                title: {
                    text: 'Average Score'
                }
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'top',
                x: 100,
                y: 70,
                floating: true,
                backgroundColor: Highcharts.defaultOptions.chart.backgroundColor,
                borderWidth: 1
            },
            plotOptions: {
                scatter: {
                    marker: {
                        radius: 5,
                        states: {
                            hover: {
                                enabled: true,
                                lineColor: 'rgb(100,100,100)'
                            }
                        }
                    },
                    states: {
                        hover: {
                            marker: {
                                enabled: false
                            }
                        }
                    },
                    tooltip: {
                        useHTML: true,
                        headerFormat: '<b>{point.label}</b><br>',
                        pointFormat: '{point.x}%, {point.y}<br>{point.additionalInfo}'
                    }
                }
            },
            series: [{
                name: 'School Data',
                data: plotData2,
                showInLegend: false // Hide the "School Data" legend
            }],
            credits: {
                enabled: false // Disable Highcharts credits
            }
        };
        setChartOptions1(options1);
        // setChartOptions2(options2);
    };

    return (
        <div className='eligibility-calculator'>
            {fileData && schoolNames && (
                <>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={chartOptions1}
                    />
                    {/* <HighchartsReact
                        highcharts={Highcharts}
                        options={chartOptions2}
                    /> */}
                    <div className="color-map">
                        <div><span style={{ backgroundColor: 'green' }}></span>Significantly Exceeds Expectations</div>
                        <div><span style={{ backgroundColor: 'blue' }}></span>Exceeds Expectations</div>
                        <div><span style={{ backgroundColor: 'black' }}></span>Meets Expectations</div>
                        <div><span style={{ backgroundColor: 'pink' }}></span>Meets Few Expectations</div>
                        <div><span style={{ backgroundColor: 'red' }}></span>Fails to Meet Expectations</div>
                        <div><span style={{ backgroundColor: 'gray' }}></span>NR-DATA</div>
                    </div>
                </>
            )}
        </div>
    );
};

export default EligibilityCalculator;
