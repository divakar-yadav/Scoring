import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './MultiYearEligibilityCalculator.css';

const MultiYearEligibilityCalculator = ({ fileData, schoolNames, aggregatedData, filters }) => {
    const getUniqueYears = (data) => {
        const yearsSet = new Set();
        data.forEach(innerArray => {
            innerArray.forEach(school => {
                yearsSet.add(school['School Year']);
            });
        });
        return Array.from(yearsSet);
    };

    const uniqueYears = getUniqueYears(aggregatedData);

    const [chartOptions1, setChartOptions1] = useState({});
    const [chartOptions2, setChartOptions2] = useState({});
    const [selectedSchoolTypes, setSelectedSchoolTypes] = useState([]);
    const [currentYear, setCurrentYear] = useState(uniqueYears[0]);
    const [filteredSchools, setFilteredSchools] = useState([]);
    const [pipelineSchools, setPipelineSchools] = useState([]);

    useEffect(() => {
        let initialSchoolTypes = filters.schoolType || [];
        if (filters.pipeline) {
            initialSchoolTypes = [...initialSchoolTypes, 'Pipeline Schools'];
        }
        setPipelineSchools(schoolNames)
        setSelectedSchoolTypes(initialSchoolTypes);
    }, [filters]);

    useEffect(() => {
        processData(aggregatedData, schoolNames, selectedSchoolTypes, currentYear);
    }, [currentYear, selectedSchoolTypes, aggregatedData, schoolNames]);

    const pipelineSchools1 = [
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

    const limitToTwoDecimals = (num) => parseFloat(num.toFixed(2));

    const getRatings = (score) => {
        if (score < 40) return 'Fails to Meet Expectations';
        if (score >= 40 && score < 50) return 'Meets Few Expectations';
        if (score >= 50 && score < 60) return 'Meets Expectations';
        if (score >= 60 && score < 70) return 'Exceeds Expectations';
        return 'Significantly Exceeds Expectations';
    };

    const filterDataByYear = (data, year) => {
        return data.map(innerArray => innerArray.filter(school => school['School Year'] === year))
                    .filter(filteredArray => filteredArray.length > 0);
    };

    const processData = (data, schoolNames, selectedSchoolTypes, year) => {
        const yearWiseFiltered = filterDataByYear(data, year);
        const filteredSchools = yearWiseFiltered[0].filter(row => (
            selectedSchoolTypes.length === 0 || 
            selectedSchoolTypes.includes(row['School Type']) || 
            (selectedSchoolTypes.includes('Pipeline Schools') && pipelineSchools.includes(row['School Name']))
        ));

        setFilteredSchools(filteredSchools); // Update the filtered schools state

        const colors = {
            'Significantly Exceeds Expectations': 'green',
            'Exceeds Expectations': 'blue',
            'Meets Expectations': 'black',
            'Meets Few Expectations': '#FF7518',
            'Fails to Meet Expectations': 'red',
            'NR-DATA': 'gray'
        };

        const plotData1 = filteredSchools.map(row => ({
            x: row['Percent Economically Disadvantaged'] * 100,
            y: row['Overall Accountability Score'],
            color: colors[row['Overall Accountability Rating']],
            name: row['School Name'],
            label: row['School Name'],
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

        const plotData2 = filteredSchools.map(row => ({
            x: row['Percent Economically Disadvantaged'] * 100,
            y: row['nonlinear'],
            color: colors[getRatings(limitToTwoDecimals(row['nonlinear']))],
            name: row['School Name'],
            label: row['School Name'],
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
                zoomType: 'xy',
                marginRight: 40
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
                zoomType: 'xy',
                marginRight: 40,
            },
            title: {
                text: 'Weighted Score vs ECD Percentage'
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
                    text: 'Weighted Score'
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
            <div className='eligibility-calculator-navbar'>
                <span>No of schools {filteredSchools.length}</span>
                <div className='eligibility-calculator-year-filter'>
                    {uniqueYears.map((item) => (
                        <div key={item} onClick={() => setCurrentYear(item)} className='eligibility-calculator-year-filter-year' style={currentYear === item ? { backgroundColor: '#3e4ee1', color: '#fff', fontWeight:600 } : null}>{item}</div>
                    ))}
                </div>
            </div>
            <div className='filters-chart-wrapper'>
                <div className="checkbox-filters">
                    <div className="color-map">
                            <div className='color-map-text'>Color Map</div>
                            <div><span style={{ backgroundColor: 'green' }}></span>Significantly Exceeds Expectations</div>
                            <div><span style={{ backgroundColor: 'blue' }}></span>Exceeds Expectations</div>
                            <div><span style={{ backgroundColor: 'black' }}></span>Meets Expectations</div>
                            <div><span style={{ backgroundColor: '#FF7518' }}></span>Meets Few Expectations</div>
                            <div><span style={{ backgroundColor: 'red' }}></span>Fails to Meet Expectations</div>
                    </div>
                </div>
                <div className='eligibility-calculator-maps'>
                    {fileData && schoolNames && (
                        <>
                        <div className='multi-eligibility-calculator-maps-1'>
                            <HighchartsReact
                                    highcharts={Highcharts}
                                    options={chartOptions2}
                                />
                        </div>
                        <div className='multi-eligibility-calculator-maps-2'>
                            <HighchartsReact
                                    highcharts={Highcharts}
                                    options={chartOptions1}
                                />
                        </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MultiYearEligibilityCalculator;
