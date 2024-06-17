import React, { useState, useEffect } from 'react';
import './HomePage.css';
import Upload from '../../components/Upload/Upload';
import Loader from '../../components/Loader/Loader';
import schoolBanner from '../../assets/1474.png';
import cross from '../../assets/cross.png';
import setting from '../../assets/setting.png';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Calculator from '../../components/Calculator/Calculator';
import EligibilityCalculator from '../EligibilityCalculator/EligibilityCalculator';
import GeneralAnalytics from '../GeneralAnalytics/GeneralAnalytics';
import GeographicalAnalytics from '../GeographicalAnalytics/GeographicalAnalytics';
import SchoolComparisonContainer from '../../views/SchoolComparisonContainer/SchoolComparisonContainer';

const HomePage = () => {
    const [fileData, setFileData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        schoolType: '',
        schoolName: '',
        gradeLevel: '',
        location: '',
        locationType: ''
    });

    const schoolNames = [
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
    const filterData = () => {
        return fileData.filter(row => {
            return (
                (row['Location'] === 'Milwaukee' || schoolNames.includes(row['School Name'])) &&
                (filters.schoolType ? row['School Type'] === filters.schoolType : true) &&
                (filters.schoolName ? row['School Name'].toLowerCase().includes(filters.schoolName.toLowerCase()) : true) &&
                (filters.gradeLevel ? row['Grade Level'] === filters.gradeLevel : true) &&
                (filters.location ? row['Location'].toLowerCase().includes(filters.location.toLowerCase()) : true) &&
                (filters.locationType ? row['Locale description'] === filters.locationType : true)
            );
        });
    };
    const printValues = (individualschool, mean, std) =>{
        // console.log(individualschool,"---parseFloat(row[key])---")
        // console.log(mean,"---mean---")
        // console.log(std,"---std---")
        const val = (individualschool - mean)/std 
        // console.log(val, "-------individualschool------")
        return val
}
    // const toStd = (data, key) => {
    //     const values = data.map(row => parseFloat(row[key]));
    //     const mean = values.reduce((a, b) => a + b, 0) / values.length;
    //     const std = Math.sqrt(values.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b, 0) / values.length);
    //     return data.map(row => ({
    //         ...row,
    //         [`${key}_score`]: (parseFloat(row[key]) - mean)/std 
    //     }));
    // };
    const toStd = (data, key) => {
        // Filter out rows with NaN values
        const filteredData = data.filter(row => !isNaN(parseFloat(row[key])));
        
        const values = filteredData.map(row => parseFloat(row[key]));
        const mean = values.reduce((a, b) => a + b, 0) / values.length;
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
        const metrics = ['ELA_achievement', 'math_achievement', 'ELA_growth', 'math_growth','graduation'];
        metrics.forEach(metric => {
            data = toStd(data, metric);
        });
        // console.log(data, "-------data------")
        return data;
    };



    const calculateNonlinear = (data) => {
        const f = (achievement, growth, ecd, graduation, k1 = 0.6, k2 = 0.3, k3 = 0.2) => {
            // console.log(achievement,"---------achievement----------")
            // console.log(growth,"---------growth----------")
            console.log(graduation ,"---------graduation----------")
            // console.log(graduation,"---------graduation----------")
            const pow = k1 * achievement + k2 * growth * ecd + k3 * graduation * ecd
            const denominator = Math.exp(-(k1 * achievement + k2 * growth * ecd + k3 * graduation * ecd))
            // console.log(pow,"---------pow----------")
            return 1 / (1 + Math.exp(-(k1 * achievement + k2 * growth * ecd + k3 * graduation * ecd)));
        };

        return data.map(row => {
            const achievement = (parseFloat(row['ELA_achievement_score']) + parseFloat(row['math_achievement_score'])) / 2.0;
            const growth = (parseFloat(row['ELA_growth_score']) + parseFloat(row['math_growth_score'])) / 2.0;
            const nonlinear = f(achievement, growth, parseFloat(row['Percent Economically Disadvantaged']), parseFloat(row['graduation_score'])) * 100.0;

            // console.log(parseFloat(row['Percent Economically Disadvantaged']),"---------Percent Economically Disadvantaged----------")

            // console.log(parseFloat(row['ELA_achievement_score']),"---------parseFloat(row['ELA_achievement_score'])----------")
            // console.log(parseFloat(row['math_achievement_score']),"---------parseFloat(row['math_achievement_score'])----------")
            // console.log(parseFloat(row['ELA_growth_score']) ,"---------parseFloat(row['ELA_growth_score'])----------")
            // console.log(parseFloat(row['math_growth_score']) ,"---------parseFloat(row['math_growth_score'])----------")

            // console.log(achievement,"---------achievement----------")
            // console.log(growth,"---------growth----------")
            // console.log(nonlinear,"---------nonlinear----------")
            return {
                ...row,
                nonlinear
            };
        });
    };


    const dropDuplicates = (data, key) => {
        const seen = new Set();
        return data.filter(row => {
            const value = row[key];
            if (seen.has(value)) {
                return false;
            } else {
                seen.add(value);
                return true;
            }
        });
    };
    const filterData2 = (data) => {
        return data.filter(row => {
            const percentDisadvantaged = parseFloat(row['Percent Economically Disadvantaged']);
            return (!isNaN(percentDisadvantaged) && percentDisadvantaged >= 0.5) || row['School Name'] === 'Golda Meir School';
        });
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

        const duplicatesdroped = dropDuplicates(renamedData, 'School Name')
        const filteredData2 = filterData2(duplicatesdroped)
        const aggregatedData = aggregateSchoolsByType(filteredData2)
        // console.log(aggregatedData,"-----aggregatedData----")

        const standardizedData = aggregatedData.map(group => {
            return toStdRange(group)
            // calculateNonlinear(group)
            }
        ).flat();
        // console.log(standardizedData,"-----standardizedData----")

        // const standardizedData = toStdRange(aggregateData);

        const calculatedData = calculateNonlinear(standardizedData);
        // console.log(calculatedData,"-----calculatedData----")
        return calculatedData.map(row => ({
            ...row,
            average: (row.ELA_achievement + row.math_achievement + row.ELA_growth + row.math_growth) / 4.0
        }));
    };

    const renderCardData = () => {
        const filteredData = filterData();
        // console.log(filteredData,"-----filteredData data----")

        const calculatedData = addCalculatedFields(filteredData);
        // console.log(calculatedData,"-----calculated data----")
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        return calculatedData.slice(startIndex, endIndex);
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
                                            <img className='schools-utilities-compare-icon' src={setting} />
                                            <span className='schools-utilities-compare-text'>Home</span>
                                        </div>
                                    </Link>
                                    <Link to='/compare-schools'>
                                        <div className='schools-utilities-compare'>
                                            <img className='schools-utilities-compare-icon' src={setting} />
                                            <span className='schools-utilities-compare-text'>Compare Schools</span>
                                        </div>
                                    </Link>
                                    <Link to='/calculate-elgibility'>
                                        <div className='schools-utilities-calculate'>
                                            <img className='schools-utilities-calculate-icon' src={setting} />
                                            <span className='schools-utilities-calculate-text'>Eligibility</span>
                                        </div>
                                    </Link>
                                    <Link to='/geographical-analytics'>
                                        <div className='schools-utilities-geo'>
                                            <img className='schools-utilities-geo-icon' src={setting} />
                                            <span className='schools-utilities-geo-text'>Geographical analytics</span>
                                        </div>
                                    </Link>
                                    <Link to='/general-analytics'>
                                        <div className='schools-utilities-analytics'>
                                            <img className='schools-utilities-analytics-icon' src={setting} />
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
                                                        <div className='filter-header-total-no-result'>944 schools</div>
                                                        <div className='filter-header-chips'>
                                                            <div className='chip'><span>Clear Filters</span><img className='chip_cross_icon' src={cross} /></div>
                                                            <div className='chip'><span>Pre School</span><img className='chip_cross_icon' src={cross} /></div>
                                                            <div className='chip'><span>Traditional Public</span><img className='chip_cross_icon' src={cross} /></div>
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
                                                    <div className='sidenav-title'>I'm looking for School Type</div>
                                                    <div className='sidenav-items-wrapper'>
                                                        <div className='sidenav-item'>
                                                            <input type="radio" name="schoolType" value="Elementary School" checked={filters.schoolType === 'Elementary School'} onChange={handleFilterChange} />
                                                            <label>Elementary School</label>
                                                        </div>
                                                        <div className='sidenav-item'>
                                                            <input type="radio" name="schoolType" value="High School" checked={filters.schoolType === 'High School'} onChange={handleFilterChange} />
                                                            <label>High School</label>
                                                        </div>
                                                        <div className='sidenav-item'>
                                                            <input type="radio" name="schoolType" value="Elementary/Secondary School" checked={filters.schoolType === 'Elementary/Secondary School'} onChange={handleFilterChange} />
                                                            <label>Elementary/Secondary School</label>
                                                        </div>
                                                        <div className='sidenav-item'>
                                                            <input type="radio" name="schoolType" value="Middle School" checked={filters.schoolType === 'Middle School'} onChange={handleFilterChange} />
                                                            <label>Middle School</label>
                                                        </div>
                                                    </div>
                                                    <div className='sidenav-section'>
                                                        <div className='sidenav-section-title'>School Name</div>
                                                        <input type="text" name="schoolName" placeholder="School Name" value={filters.schoolName} onChange={handleFilterChange} />
                                                    </div>
                                                    <div className='sidenav-section'>
                                                        <div className='sidenav-section-title'>Grade Level</div>
                                                        <select name="gradeLevel" value={filters.gradeLevel} onChange={handleFilterChange}>
                                                            <option value="">Select Grade Level</option>
                                                            <option value="Elementary School">Elementary School</option>
                                                            <option value="Elementary/Secondary School">Elementary/Secondary School</option>
                                                            <option value="Middle School">Middle School</option>
                                                            <option value="High School">High School</option>
                                                        </select>
                                                    </div>
                                                    <div className='sidenav-section'>
                                                        <div className='sidenav-section-title'>Location</div>
                                                        <div className='sidenav-section-content'>
                                                            <select name="location" value={filters.location} onChange={handleFilterChange}>
                                                                <option value="">Select State</option>
                                                                <option value="Wisconsin">Wisconsin</option>
                                                            </select>
                                                            <input type="text" name="location" placeholder="City or ZIP" value={filters.location} onChange={handleFilterChange} />
                                                        </div>
                                                    </div>
                                                    <div className='sidenav-section'>
                                                        <div className='sidenav-section-title'>Location Type</div>
                                                        <select name="locationType" value={filters.locationType} onChange={handleFilterChange}>
                                                            <option value="">Select Location Type</option>
                                                            <option value="City">City</option>
                                                            <option value="Rural">Rural</option>
                                                            <option value="Town">Town</option>
                                                            <option value="Suburb">Suburb</option>
                                                        </select>
                                                    </div>
                                                    <Calculator/>
                                                </div>
                                                <div className='cards-container'>
                                                <div class="chip-filter-container">
                                                        <div class="chip-filter">National</div>
                                                        <div class="chip-filter">Traditional</div>
                                                        <div class="chip-filter">Magnet</div>
                                                        <div class="chip-filter">Charter</div>
                                                        <div class="chip-filter">STEM</div>
                                                        <div class="chip-filter">Search by District</div>
                                                    </div>

                                                    {renderCardData().map((row, rowIndex) => (
                                                        <div key={rowIndex} className="card">
                                                            <div className="card-content">
                                                                <div className='card-content-banner'>
                                                                    <img src={schoolBanner} alt="School Banner" />
                                                                </div>
                                                                <div className='card-content-main-info'>
                                                                    <div className='card-content-main-info-title'>{row['School Name']}</div>
                                                                    <div className='card-content-main-info-meta'>
                                                                        <div className='card-content-main-info-address'>{row['Location']}</div>
                                                                        <div className='card-content-main-info-school-type'>{row['School Type']}</div>
                                                                    </div>
                                                                    <div className='card-content-main-info-description'>Abbotsford Christian Academy is a private school located in Abbotsford, WI, which is in a fringe rural setting. The student population of Abbotsford Christian Academy is 45, and the school serves PK through...</div>
                                                                </div>
                                                                <div className='card-content-other-info'>
                                                                    {/* <div className='card-content-other-info-1'>
                                                                        <div className='card-content-other-info-1-key'>ELA Achievement</div>
                                                                        <div className='card-content-other-info-1-value'>{row.ELA_achievement}</div>
                                                                    </div>
                                                                    <div className='card-content-other-info-2'>
                                                                        <div className='card-content-other-info-1-key'>Math Achievement</div>
                                                                        <div className='card-content-other-info-1-value'>{row.math_achievement}</div>
                                                                    </div>
                                                                    <div className='card-content-other-info-3'>
                                                                        <div className='card-content-other-info-1-key'>ELA Growth</div>
                                                                        <div className='card-content-other-info-1-value'>{row.ELA_growth}</div>
                                                                    </div>
                                                                    <div className='card-content-other-info-3'>
                                                                        <div className='card-content-other-info-1-key'>Math Growth</div>
                                                                        <div className='card-content-other-info-1-value'>{row.math_growth}</div>
                                                                    </div> */}
                                                                    <div className='card-content-other-info-3'>
                                                                        <div className='card-content-other-info-1-key'>Nonlinear Score</div>
                                                                        <div className='card-content-other-info-1-value'>{row.nonlinear}</div>
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
                            <Route exact  path="/calculate-elgibility" Component={() => fileData.length > 0 && <EligibilityCalculator fileData={fileData} schoolNames={schoolNames}/>} />
                            <Route exact path="/general-analytics" Component={() => fileData.length > 0 && <GeneralAnalytics data={fileData}/>} />
                            <Route exact path="/geographical-analytics" Component={() => fileData.length > 0 && <GeographicalAnalytics data={fileData}/>} />
                            <Route exact path="/compare-schools" Component={() => fileData.length > 0 && <SchoolComparisonContainer schools={fileData} />} />
                        </Routes>
                    </div>
                </Router>
            )}
        </div>
    );
};

export default HomePage;
