import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './EligibilityCalculator.css';

const EligibilityCalculator = ({ fileData, schoolNames, calculatedData }) => {
    const [chartOptions1, setChartOptions1] = useState({});
    const [chartOptions2, setChartOptions2] = useState({});
    const [selectedSchoolTypes, setSelectedSchoolTypes] = useState([]);

    useEffect(() => {
        if (fileData && schoolNames) {
            processData(fileData, schoolNames, selectedSchoolTypes);
        }
    }, [fileData, schoolNames, selectedSchoolTypes]);
    const pipelineSchools = [
        "Bruce Guadalupe",
        "Forest Home Elementary",
        "Milwaukee College Preparatory School -- 36th Street Campus",
        "Milwaukee College Preparatory School -- 38th Street",
        "Milwaukee College Preparatory School -- Lloyd Street",
        "Milwaukee College Preparatory School: Lola Rowe North Campus",
        "Milwaukee Environmental Science Academy",
        "Notre Dame School of Milwaukee",
        "Prince of Peace",
        "Rocketship Southside Community Prep",
        "Rocketship Transformation Prep",
        "Saint Marcus Lutheran School",
        "Stellar Collegiate Charter School",
        "United Community Center Acosta Middle School",
        "Wedgewood Park School",
        "Carmen High School of Science and Technology South Campus",
        "Carmen High School of Science and Technology Southeast Campus",
        "Carmen Middle/High School of Science and Technology Northwest Campus",
        "Carmen Middle School South",
        "Cristo Rey Jesuit Milwaukee High School",
        "Dr Howard Fuller Collegiate Academy",
        "King International",
        "Reagan College Preparatory High",
        "HAPA-Hmong American Peace Academy K3-12",
        "Milwaukee Academy of Science",
        "Saint Augustine Preparatory Academy",
        "Kingdom Prep Lutheran High School",
        "Pilgrim Lutheran School",
        "Golda Meir School"
    ];
    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;

        setSelectedSchoolTypes((prevSelectedSchoolTypes) => {
            if (checked ) {
                return [...prevSelectedSchoolTypes, name];
            } 
            else {
                return prevSelectedSchoolTypes.filter((type) => type !== name);
            }
        });

    };
    const limitToTwoDecimals = (num) => {
        return parseFloat(num.toFixed(2));
    };
    const getRatings = (score) => {
        let category = '';

        if (score < 40) {
            category = 'Fails to Meet Expectations';
        } else if (score >= 40 && score < 50) {
            category = 'Meets Few Expectations';
        } else if (score >= 50 && score < 60) {
            category = 'Meets Expectations';
        } else if (score >= 60 && score < 70) {
            category = 'Exceeds Expectations';
        } else if (score >= 70) {
            category = 'Significantly Exceeds Expectations';
        }

        return category;
    }
    const filteredSchools = calculatedData.filter(row =>  (selectedSchoolTypes.length === 0 || selectedSchoolTypes.includes(row['School Type']) || selectedSchoolTypes.includes('Pipeline Schools') && pipelineSchools.includes(row['School Name']) ))

    const processData = (data, schoolNames, selectedSchoolTypes) => {
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

        const plotData1 = calculatedData.filter(row =>  (selectedSchoolTypes.length === 0 || selectedSchoolTypes.includes(row['School Type']) || selectedSchoolTypes.includes('Pipeline Schools') && pipelineSchools.includes(row['School Name']) )).map(row => ({
            x: row['Percent Economically Disadvantaged'] * 100,
            y: row['Overall Accountability Score'],
            color: colors[row['Overall Accountability Rating']],
            name: row['School Name'],
            label: row['School Name'].charAt(0),
            additionalInfo: `
                <b>School Name:</b> ${row['School Name']}<br>
                <b>School Type:</b> ${row['School Type']}<br>
                <b>DPI Score:</b> ${row['Overall Accountability Score'].toFixed(2)}<br>
                <b>Nonlinear Score :</b> ${row['nonlinear'].toFixed(2)}<br>
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

        const plotData2 = calculatedData.filter(row =>  (selectedSchoolTypes.length === 0 || selectedSchoolTypes.includes(row['School Type']) || selectedSchoolTypes.includes('Pipeline Schools') && pipelineSchools.includes(row['School Name']))).map(row => ({
            x: row['Percent Economically Disadvantaged'] * 100,
            y: row['nonlinear'],
            color: colors[getRatings(limitToTwoDecimals(row['nonlinear']))],
            name: row['School Name'],
            label: row['School Name'].charAt(0),
            additionalInfo: `
                <b>School Name:</b> ${row['School Name']}<br>
                <b>School Type:</b> ${row['School Type']}<br>
                <b>DPI Score:</b> ${row['Overall Accountability Score']}<br>
                <b>Nonlinear Score :</b> ${row['nonlinear'].toFixed(2)}<br>
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
                text: 'DPI Score vs ECD Percentage'
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
                    text: 'DPI Score'
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
                text: 'New Score vs ECD Percentage'
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
                    text: 'New Score'
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
                        pointFormat: '{point.additionalInfo}'
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
        setChartOptions2(options2);
    };

    const schoolTypes = [
        'Elementary School',
        'High School',
        'Elementary/Secondary School',
        'Middle School',
        'Pipeline Schools',
    ];

    return (
        <div className='eligibility-calculator'>
            <div className='eligibility-calculator-navbar'><span>No of schools {filteredSchools.length} </span></div>
            <div className='filters-chart-wrapper'>
            <div className="checkbox-filters">
                <div className='checkbox-filters-title-text'>I'm looking for School Type</div>
                <div className='checkbox-filters-school-types'>
                {schoolTypes.map((type) => (
                        <label key={type}>
                            <input
                                type="checkbox"
                                name={type}
                                checked={selectedSchoolTypes.includes(type)}
                                onChange={handleCheckboxChange}
                            />
                        <span>{type}</span> 
                        </label>
                    ))}
                </div>
            </div>
            <div className='eligibility-calculator-maps'>
                {fileData && schoolNames && (
                    <>
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={chartOptions2}
                        />
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={chartOptions1}
                        />

                        <div className="color-map">
                            <div><span style={{ backgroundColor: 'green' }}></span>Significantly Exceeds Expectations</div>
                            <div><span style={{ backgroundColor: 'blue' }}></span>Exceeds Expectations</div>
                            <div><span style={{ backgroundColor: 'black' }}></span>Meets Expectations</div>
                            <div><span style={{ backgroundColor: 'pink' }}></span>Meets Few Expectations</div>
                            <div><span style={{ backgroundColor: 'red' }}></span>Fails to Meet Expectations</div>
                        </div>
                    </>
                )}
            </div>
            </div>


        </div>
    );
};

export default EligibilityCalculator;
