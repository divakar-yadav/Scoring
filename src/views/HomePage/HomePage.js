import React, { useState, useEffect } from 'react';
import './HomePage.css';
import Upload from '../../components/Upload/Upload';
import Loader from '../../components/Loader/Loader';
import schoolBanner from '../../assets/1474.png';
import cross from '../../assets/cross.png';
import home from '../../assets/home.png';
import schools from '../../assets/school.png';
import calculator from '../../assets/calculator.png';
import geo from '../../assets/geographic.png';
import analysis from '../../assets/monitor.png';
import SmallMap from '../../components/SmallMap/SmallMap';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Calculator from '../../components/Calculator/Calculator';
import EligibilityCalculator from '../EligibilityCalculator/EligibilityCalculator';
import GeneralAnalytics from '../GeneralAnalytics/GeneralAnalytics';
import GeographicalAnalytics from '../GeographicalAnalytics/GeographicalAnalytics';
import SchoolComparisonContainer from '../../views/SchoolComparisonContainer/SchoolComparisonContainer';
import SchoolDetail from '../../views/SchoolDetail/SchoolDetail';
import CheckboxList from '../../components/CheckboxList/CheckboxList';

const HomePage = () => {
    const [fileData, setFileData] = useState([]);
    const [totalSchools, setTotalSchools] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        schoolType: '',
        schoolName: '',
        gradeLevel: '',
        location: '',
        locationType: ''
    });
    const [filterChips, setFilterChips] = useState([]);

    const colors = {
        'Significantly Exceeds Expectations': 'green',
        'Exceeds Expectations': 'blue',
        'Meets Expectations': 'black',
        'Meets Few Expectations': 'pink',
        'Fails to Meet Expectations': 'red',
        'NR-DATA': 'gray'
    };

    const pipeline = [
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

    const options = ['Elementary School', 'High School', 'Elementary/Secondary School', 'Middle School'];

    const [loading, setLoading] = useState(false);

    const rowsPerPage = 10;
    const totalPages = Math.ceil(fileData.length / rowsPerPage);

    const handleClick = (event, page) => {
        event.preventDefault();
        setCurrentPage(page);
    };

    const handleNext = (event) => {
        event.preventDefault();
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevious = (event) => {
        event.preventDefault();
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleFileUpload = (uploadedData) => {
        setLoading(true);
        setTimeout(() => {
            setFileData(uploadedData);
            setLoading(false);
        }, 4000);
    };

    const aggregateSchoolsByType = (data) => {
        const schoolTypes = ['Elementary School', 'Middle School', 'High School', 'Elementary/Secondary School'];
        const schools = [];
    
        schoolTypes.forEach(type => {
            const filteredSchools = data.filter(row => row['School Type'] === type);
            if (filteredSchools.length > 0) {
                schools.push(filteredSchools);
            }
        });
    
        return schools;
    };

    const filterSchool1 = (pipeline) => {
        return fileData.filter(row => row['City'] === 'Milwaukee' || pipeline.includes(row['School Name']));
    };

    const filterData = () => {
        return fileData.filter(row => {
            return (
                (row['Location'] === 'Milwaukee' || pipeline.includes(row['School Name'])) &&
                (filters.schoolType ? row['School Type'] === filters.schoolType : true) &&
                (filters.schoolName ? row['School Name'].toLowerCase().includes(filters.schoolName.toLowerCase()) : true) &&
                (filters.gradeLevel ? row['Grade Level'] === filters.gradeLevel : true) &&
                (filters.location ? row['Location'].toLowerCase().includes(filters.location.toLowerCase()) : true) &&
                (filters.locationType ? row['Locale description'] === filters.locationType : true)
            );
        });
    };

    const printValues = (individualschool, mean, std) => {
        const val = (individualschool - mean) / std;
        return val;
    };

    const calculateTotalSum = (arr) => {
        let totalSum = 0;
        for (let i = 0; i < arr.length; i++) {
            totalSum += parseFloat(arr[i]);
        }
        return totalSum;
    };

    const toStd1 = (data, key) => {
        const filteredData = data.filter(row => !isNaN(parseFloat(row[key])));
    
        const values = filteredData.map(row => parseFloat(row[key]));
        const mean = calculateTotalSum(values) / values.length;
        const std = Math.sqrt(calculateTotalSum(values.map(x => Math.pow(x - mean, 2))) / values.length);
    
        return data.map(row => {
            const value = parseFloat(row[key]);
            if (isNaN(value)) {
                return row;
            }
            return {
                ...row,
                [`${key}_score`]: (value - mean) / std
            };
        });
    };

    const toStd = (data, key) => {
        const filteredData = data.filter(row => !isNaN(parseFloat(row[key])));
        
        const values = filteredData.map(row => parseFloat(row[key]));
        const sum = values.reduce((acc, num) => acc + parseFloat(num), 0);
        const mean = sum / values.length;
        const std = Math.sqrt(values.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b, 0) / values.length);

        return data.map(row => {
            const value = parseFloat(row[key]);
            if (isNaN(value)) {
                return row;
            }
            return {
                ...row,
                [`${key}_score`]: printValues(value, mean, std)
            };
        });
    };

    const toStdRange = (data) => {
        const metrics = ['ELA_achievement', 'math_achievement', 'ELA_growth', 'math_growth', 'graduation'];
        metrics.forEach(metric => {
            data = toStd(data, metric);
        });
        return data;
    };

    const calculateNonlinear = (data) => {
        const f = (achievement, growth, ecd, graduation, schoolName, k1 = 0.6, k2 = 0.3, k3 = 0.2) => {
            return 1 / (1 + Math.exp(-(k1 * achievement + k2 * growth * ecd + k3 * graduation * ecd)));
        };

        return data.map(row => {
            const achievement = (parseFloat(row['ELA_achievement_score']) + parseFloat(row['math_achievement_score'])) / 2.0;
            const growth = (parseFloat(row['ELA_growth_score']) + parseFloat(row['math_growth_score'])) / 2.0;
            const nonlinear = f(achievement, growth, parseFloat(row['Percent Economically Disadvantaged']), parseFloat(row['graduation_score']), row['School Name']) * 100.0;

            return {
                ...row,
                nonlinear
            };
        });
    };

    const filterData2 = (data) => {
        return data.filter(row => {
            const percentDisadvantaged = parseFloat(row['Percent Economically Disadvantaged']);
            return (!isNaN(percentDisadvantaged) && percentDisadvantaged >= 0.5) || row['School Name'] === 'Golda Meir School';
        });
    };

    const isColumnBlank = (row, columnName) => {
        if (row.hasOwnProperty(columnName)) {
            const value = row[columnName];
            return value === null || value === undefined || value === "";
        }
        return true;
    };

    const addCalculatedFields = (data) => {
        const renamedData = data.map(row => ({
            ...row,
            ELA_achievement: parseFloat(row['School ELA Achievement Score']),
            math_achievement: parseFloat(row['School Mathematics Achievement Score']),
            ELA_growth: parseFloat(row['School ELA Growth Score']),
            math_growth: parseFloat(row['School Mathematics Growth Score']),
            graduation: parseFloat(row['School On-Track to Graduation Score'])
        }));

        const filteredData2 = filterData2(renamedData);
        const aggregatedData = aggregateSchoolsByType(filteredData2);

        const standardizedData = aggregatedData.map(group => toStdRange(group)).flat();
        const calculatedData = calculateNonlinear(standardizedData);

        return calculatedData.map(row => ({
            ...row,
            average: (row.ELA_achievement + row.math_achievement + row.ELA_growth + row.math_growth) / 4.0
        }));
    };

    const filterDataOverAll = (data, pipeline) => {
        let filteredData = data.filter(row => row['City'] === 'Milwaukee' || pipeline.includes(row['School Name']));
    
        const features = [
            'School Name', 'Overall Accountability Score', 'Overall Accountability Rating',
            'School Type', 'School Enrollment', 'School ELA Achievement Score', 
            'School Mathematics Achievement Score', 'School ELA Growth Score', 
            'School Mathematics Growth Score', 'School On-Track to Graduation Score', 
            'Percent Economically Disadvantaged'
        ];
    
        filteredData = filteredData.filter(row => {
            return features.every(feature => row.hasOwnProperty(feature) && row[feature] !== null && row[feature] !== undefined && row[feature] !== 'NA');
        });
    
        const uniqueData = [];
        const seenNames = new Set();
        filteredData.forEach(row => {
            if (!seenNames.has(row['School Name'])) {
                seenNames.add(row['School Name']);
                uniqueData.push(row);
            }
        });
        filteredData = uniqueData;
    
        filteredData = filteredData.filter(row => {
            const percentDisadvantaged = parseFloat(row['Percent Economically Disadvantaged']);
            return (percentDisadvantaged >= 0.5) || (row['School Name'] === 'Golda Meir School');
        });
    
        return filteredData;
    };

    const renderCardData = () => {
        const filteredData = filterDataOverAll(fileData, pipeline);
        const calculatedData = addCalculatedFields(filteredData);
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        return { paginatedData: calculatedData.slice(startIndex, endIndex), calculatedData: calculatedData };
    };

    const renderPagination = () => {
        const pageNumbers = [];
        const maxPagesToShow = 5;
        let startPage, endPage;

        if (totalPages <= maxPagesToShow) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= Math.floor(maxPagesToShow / 2)) {
                startPage = 1;
                endPage = maxPagesToShow;
            } else if (currentPage + Math.floor(maxPagesToShow / 2) >= totalPages) {
                startPage = totalPages - maxPagesToShow + 1;
                endPage = totalPages;
            } else {
                startPage = currentPage - Math.floor(maxPagesToShow / 2);
                endPage = currentPage + Math.floor(maxPagesToShow / 2);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return (
            <>
                <button
                    className="page-button"
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {pageNumbers.map(page => (
                    <button
                        key={page}
                        className={`page-button ${currentPage === page ? 'active' : ''}`}
                        onClick={(event) => handleClick(event, page)}
                    >
                        {page}
                    </button>
                ))}
                <button
                    className="page-button"
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </>
        );
    };

    const limitToTwoDecimals = (num) => {
        return parseFloat(num.toFixed(2));
    };

    const handleChipClick = (chip) => {
        if (!filterChips.includes(chip)) {
            setFilterChips([...filterChips, chip]);
        }
    };

    const handleRemoveChip = (chipToRemove) => {
        setFilterChips(filterChips.filter(chip => chip !== chipToRemove));
    };

    return (
        <div className='homepage'>
            <Upload setFileData={handleFileUpload} maxFiles={1} />
            {loading ? (
                <Loader />
            ) : (
                <Router>
                    <div className='school-cards'>
                        <div className='schools-utilities'>
                            {fileData.length > 0 && (
                                <div className='schools-utilities-wrapper'>
                                    <Link to='/'>
                                        <div className='schools-utilities-compare'>
                                            <img className='schools-utilities-compare-icon' src={home} />
                                            <span className='schools-utilities-compare-text'>Home</span>
                                        </div>
                                    </Link>
                                    <Link to='/compare-schools'>
                                        <div className='schools-utilities-compare'>
                                            <img className='schools-utilities-compare-icon' src={schools} />
                                            <span className='schools-utilities-compare-text'>Compare Schools</span>
                                        </div>
                                    </Link>
                                    <Link to='/calculate-elgibility'>
                                        <div className='schools-utilities-calculate'>
                                            <img className='schools-utilities-calculate-icon' src={calculator} />
                                            <span className='schools-utilities-calculate-text'>Eligibility</span>
                                        </div>
                                    </Link>
                                    <Link to='/geographical-analytics'>
                                        <div className='schools-utilities-geo'>
                                            <img className='schools-utilities-geo-icon' src={geo} />
                                            <span className='schools-utilities-geo-text'>Geographical analytics</span>
                                        </div>
                                    </Link>
                                    <Link to='/general-analytics'>
                                        <div className='schools-utilities-analytics'>
                                            <img className='schools-utilities-analytics-icon' src={analysis} />
                                            <span className='schools-utilities-analytics-text'>General Analysis</span>
                                        </div>
                                    </Link>
                                </div>
                            )}
                        </div>
                        <Routes>
                            <Route path="/" element={
                                <React.Fragment>
                                    {fileData.length > 0 && (
                                        <>
                                            <div className='filter-header'>
                                                <div className='filter-header-wrapper'>
                                                    <div className='filter-header-chips-result-count-wrapper'>
                                                        <div className='filter-header-total-no-result'>No of schools</div>
                                                        <div className='filter-header-chips'>
                                                            {filterChips.map((chip, index) => (
                                                                <div key={index} className='chip'>
                                                                    <span>{chip}</span>
                                                                    <img className='chip_cross_icon' src={cross} onClick={() => handleRemoveChip(chip)} />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className='filter-header-sort'>
                                                        <div className='filter-header-sort-text'>Sort By:</div>
                                                        <select name="locationType" value={filters.locationType} onChange={handleFilterChange}>
                                                            <option value="">{`Alphabetically (A-Z)`}</option>
                                                            <option value="City">{`Alphabetically (Z-A)`}</option>
                                                            <option value="Rural">{`Enrollment (low to high)`}</option>
                                                            <option value="Town">{`Enrollment (high to low)`}</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='school-cards-sidenav-wrapper'>
                                                <div className='sidenav'>
                                                    <CheckboxList title="I'm looking for School Type" options={options} />
                                                </div>
                                                <div className='cards-container'>
                                                    <div className="chip-filter-container">
                                                        <div className="chip-filter" onClick={() => handleChipClick('National')}>National</div>
                                                        <div className="chip-filter" onClick={() => handleChipClick('Traditional')}>Traditional</div>
                                                        <div className="chip-filter" onClick={() => handleChipClick('Magnet')}>Magnet</div>
                                                        <div className="chip-filter" onClick={() => handleChipClick('Charter')}>Charter</div>
                                                        <div className="chip-filter" onClick={() => handleChipClick('STEM')}>STEM</div>
                                                        <div className="chip-filter" onClick={() => handleChipClick('Search by District')}>Search by District</div>
                                                    </div>
                                                    {renderCardData().paginatedData.map((row, rowIndex) => (
                                                        <div key={rowIndex} className="card">
                                                            <div className="card-content">
                                                                <SmallMap lat={!isColumnBlank(row, 'Lat') ? row['Lat'] : 42.9768124833109} lng={!isColumnBlank(row, 'Long') ? row['Long'] : -88.0103937245483} />
                                                                <div className='card-content-main-info'>
                                                                    <Link to="/school" state={JSON.stringify(row)}>{row['School Name']}</Link>
                                                                    <div className='card-content-main-info-meta'>
                                                                        <div className='card-content-main-info-address'>{row['Location']}</div>
                                                                        <div className='card-content-main-info-school-type'>{row['School Type']}</div>
                                                                    </div>
                                                                    <div className='card-content-main-info-school-type'>{row['Overall Accountability Rating']}</div>
                                                                </div>
                                                                <div className='card-content-other-info'>
                                                                    <div className='card-content-other-info-3'>
                                                                        <div className='card-content-other-info-1-key'>DPI Score</div>
                                                                        <div className='card-content-other-info-1-value'>{limitToTwoDecimals(row['Overall Accountability Score'])}</div>
                                                                    </div>
                                                                    <div className='card-content-other-info-3'>
                                                                        <div className='card-content-other-info-1-key'>Nonlinear Score</div>
                                                                        <div className='card-content-other-info-1-value'>{limitToTwoDecimals(row.nonlinear)}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='card-content-nav'>
                                                                <div className='ratings'></div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="pagination">
                                                {renderPagination()}
                                            </div>
                                        </>
                                    )}
                                </React.Fragment>
                            } />
                            <Route path="/school" element={<SchoolDetail />} />
                            <Route exact path="/calculate-elgibility" Component={() => fileData.length > 0 && <EligibilityCalculator fileData={fileData} schoolNames={pipeline} />} />
                            <Route exact path="/general-analytics" Component={() => fileData.length > 0 && <GeneralAnalytics data={fileData} />} />
                            <Route exact path="/geographical-analytics" Component={() => fileData.length > 0 && <GeographicalAnalytics data={fileData} calculatedData={renderCardData().calculatedData} />} />
                            <Route exact path="/compare-schools" Component={() => fileData.length > 0 && <SchoolComparisonContainer schools={fileData} />} />
                        </Routes>
                    </div>
                </Router>
            )}
        </div>
    );
};

export default HomePage;
