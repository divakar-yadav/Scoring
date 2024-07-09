import React, { useState, useEffect } from 'react';
import './MultiYearHomePage.css';
import Upload from '../../components/Upload/Upload';
import Loader from '../../components/Loader/Loader';
import cross from '../../assets/cross.png';
import home from '../../assets/home.png';
import schools from '../../assets/school.png';
import calculator from '../../assets/calculator.png';
import setting from '../../assets/setting.png';
import geo from '../../assets/geographic.png';
import analysis from '../../assets/monitor.png';
import SmallMap from '../../components/SmallMap/SmallMap';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import MultiYearEligibilityCalculator from '../MultiYearEligibilityCalculator/MultiYearEligibilityCalculator';
import MultiYearGeneralAnalytics from '../../MultipleFilesViews/MultiYearGeneralAnalytics/MultiYearGeneralAnalytics';
import MultiYearGeographicalAnalytics from '../../MultipleFilesViews/MultiYearGeographicalAnalytics/MultiYearGeographicalAnalytics';
import MultiYearSchoolComparisonContainer from '../../MultipleFilesViews/MultiYearSchoolComparisonContainer/MultiYearSchoolComparisonContainer';
import MultiYearSchoolDetail from '../../MultipleFilesViews/MultiYearSchoolDetail/MultiYearSchoolDetail';
import CheckboxList from '../../components/CheckboxList/CheckboxList';
import ConfigManagement from '../ConfigManagement/ConfigManagement';
import CompareMultipleSeriesChart from '../../components/CompareMultipleSeriesChart/CompareMultipleSeriesChart';
import { useNavigate } from 'react-router-dom';

const MultiYearHomePage = () => {
    const [fileData, setFileData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        schoolType: [],
        pipeline: false,
        gradeLevel: '',
        location: '',
        locationType: ''
    });
    const [sorting, setSorting] = useState({
        sortBy: ''
    });
    const [filterChips, setFilterChips] = useState([]);
    const [currentTab, setCurrentTab] = useState('Home');
    const [hideFilters, setHideFilters] = useState(false);
    const [pipeline, setPipeline] = useState([])

    const schoolTypes = [
        'Elementary School',
        'High School',
        'Elementary/Secondary School',
        'Middle School',
        'Pipeline Schools',
    ];
    const pipeLineSchools = [
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
    const schoolsLatLong = [
        ["Academy of Accelerated Learning", 42.97685654, -88.0110754],
        ["ALBA - Academia de Lenguaje y Bellas Artes", 43.01194698, -87.95341207],
        ["Alcott Elementary", 42.97945756, -88.03451662],
        ["Allen-Field Elementary", 43.01468193, -87.92045219],
        ["Alliance School of Milwaukee", 43.05391805, -87.92248466],
        ["Andrew S Douglas Middle", 43.0824614, -87.93155223],
        ["Audubon Technology and Communication High", 42.98421054, -87.96231854],
        ["Audubon Technology and Communication Middle", 42.98421054, -87.96231854],
        ["Auer Avenue Elementary", 43.0765954, -87.9416452],
        ["Barbee Elementary", 43.09840801, -87.9422835],
        ["Barton Elementary", 43.14175123, -87.98346046],
        ["Bay View High", 42.99452571, -87.8987973],
        ["Bethune Academy", 43.05086302, -87.95809079],
        ["Bradley Technology High", 43.02401039, -87.91472558],
        ["Brown Street Academy", 43.05697655, -87.93813225],
        ["Browning Elementary", 43.11739093, -87.99051264],
        ["Bruce Elementary", 45.45960391, -91.27347325],
        ["Bruce Elementary", 43.13550011, -88.02361293],
        ["Bruce Guadalupe", 43.02061815, -87.92185625],
        ["Bryant Elementary", 43.12101394, -88.02175749],
        ["Bryant Elementary", 46.66638693, -92.10010783],
        ["Burbank Elementary", 43.02720018, -87.98862594],
        ["Burdick Elementary", 42.9655008, -87.9040024],
        ["Carmen High School of Science and Technology South Campus", 43.01194698, -87.95341207],
        ["Carmen High School of Science and Technology Southeast Campus", 42.98929612, -87.94572409],
        ["Carmen Middle School South", 43.00034043, -87.93156379],
        ["Carmen Middle/High School of Science and Technology Northwest Campus", 43.11774906, -88.00061386],
        ["Carson Academy", 43.09069312, -87.97530654],
        ["Carver Academy", 43.05583245, -87.91076917],
        ["Cass Street Elementary", 43.05173637, -87.90253882],
        ["Central City Cyberschool", 43.09555027, -87.969068],
        ["Clarke Street Elementary", 43.06649796, -87.9494407],
        ["Clemens Elementary", 43.09414019, -87.95881356],
        ["Clement Avenue Elementary", 42.97782007, -87.89338919],
        ["Congress Elementary", 43.10674765, -87.93078493],
        ["Cooper Elementary", 42.95240228, -87.97313619],
        ["Craig Montessori School", 43.11919124, -88.02935897],
        ["Cristo Rey Jesuit Milwaukee High School",43.024749646345605,-87.93628182863077],
        ["Curtin Elementary", 42.95816823, -87.92252436],
        ["Darrell Lynn Hines Academy", 43.11593685, -88.02562447],
        ["Doerfler Elementary", 43.00271194, -87.94562452],
        ["Dr Howard Fuller Collegiate Academy",43.09038479,-87.94886899],
        ["Eighty-First Street Elementary", 43.10234762, -88.02670416],
        ["Elm Creative Arts Elementary", 43.0509699, -87.95034207],
        ["Emerson Elementary", 43.05196167, -87.98575856],
        ["Engleburg Elementary", 43.11933108, -87.99237517],
        ["Fairview Elementary", 42.99390889, -88.013856],
        ["Fifty-Third Street Elementary", 43.05383256, -87.9781167],
        ["Forest Home Elementary", 43.003922, -87.936053],
        ["Franklin Elementary", 43.0719822, -87.95957689],
        ["Fratney Elementary", 43.06355839, -87.89855349],
        ["Gaenslen Elementary", 43.07098234, -87.90761022],
        ["Garden Homes Lutheran School", 43.09361152, -87.94994778],
        ["Golda Meir School",43.05157002,-87.91473992],
        ["Garland Elementary", 42.96347988, -87.95561598],
        ["Goodrich Elementary", 43.09065457, -88.01244504],
        ["Grant Elementary", 43.04142272, -87.94243826],
        ["Grantosa Drive Elementary", 43.0936702, -88.02399679],
        ["Granville Lutheran School", 43.16106478, -88.02126201],
        ["Greater Holy Temple Christian Academy", 43.12527655, -87.97801588],
        ["Greenfield Bilingual", 42.99826082, -87.93818218],
        ["Hampton Elementary", 43.09137319, -87.9512114],
        ["HAPA-Hmong American Peace Academy K3-12",43.1014341,-88.01864621],
        ["Hartford Avenue Elementary", 43.07725729, -87.89319113],
        ["Hawley Environmental School", 43.01543599, -87.98508173],
        ["Hawthorne Elementary", 43.02288296, -87.92979126],
        ["Hayes Bilingual School", 43.00073768, -87.93053994],
        ["Hi-Mount Elementary", 43.05706493, -87.97733571],
        ["Holmes Elementary", 43.05294769, -87.91745814],
        ["Honey Creek Elementary", 43.00241929, -88.0423367],
        ["Hope Christian School Caritas", 43.07224927, -87.94562441],
        ["Hope Christian School Fidelis", 43.06414548, -87.95990267],
        ["Hope Christian School Fortis", 43.10422769, -87.9292296],
        ["Hope Christian School Prima", 43.03706566, -87.93372728],
        ["Hope Christian School Semper", 43.13377472, -87.92938016],
        ["Hopkins Lloyd Community School", 43.08511904, -87.94463569],
        ["Humboldt Park Elementary", 42.9973536, -87.89999467],
        ["IDEAL Individualized Developmental Educational Approaches to Learning", 43.05655858, -87.95723295],
        ["Jackson Elementary", 43.01655865, -87.9237088],
        ["Kagel Elementary", 43.00978543, -87.92534205],
        ["Keefe Avenue Elementary", 43.080553, -87.9407237],
        ["Kilbourn Elementary", 43.06251068, -87.95108387],
        ["King Jr Elementary", 43.05235678, -87.90824795],
        ["King International", 43.06905381, -87.91030959],
        ["King's Academy Christian School, Inc.", 43.05927113, -87.91296079],
        ["Kingdom Prep Lutheran High School",43.06711243884803,-88.00623137715277],
        ["Kluge Elementary", 43.12212431, -87.94420943],
        ["La Causa Charter School", 43.021497, -87.93341114],
        ["LaFollette Elementary", 42.97173098, -87.9487347],
        ["Lancaster Elementary", 43.11106739, -88.02462442],
        ["Lincoln Avenue Elementary", 42.99830191, -87.9306188],
        ["Longfellow Elementary", 43.07164962, -87.91867638],
        ["Lowell International Elementary", 42.96603812, -87.91133784],
        ["Manitoba Elementary", 42.99659534, -87.97342774],
        ["Maple Tree Elementary", 43.15782338, -88.0182146],
        ["Metcalfe Elementary", 43.06419131, -87.96490791],
        ["Milwaukee Academy of Chinese Language", 43.05970419, -87.92207578],
        ["Milwaukee Academy of Science",43.04224336,-87.93956952],
        ["Milwaukee College Preparatory School -- 36th Street Campus", 43.06200967, -87.95686479],
        ["Milwaukee College Preparatory School -- 38th Street", 43.04594614, -87.95197448],
        ["Milwaukee College Preparatory School -- Lloyd Street", 43.07124915, -87.94317341],
        ["Milwaukee College Preparatory School: Lola Rowe North Campus", 43.060912, -87.929479],
        ["Milwaukee Environmental Science Academy", 43.088656, -87.994675],
        ["Milwaukee Excellence Charter School", 43.107816, -87.940548],
        ["Milwaukee French Immersion", 43.062041, -87.978149],
        ["Milwaukee High School of the Arts", 43.045147, -87.942004],
        ["Milwaukee Lutheran High School", 43.093151, -88.021563],
        ["Milwaukee Math and Science Academy", 43.068541, -87.967967],
        ["Milwaukee Parkside School", 42.991086, -87.905155],
        ["Milwaukee Scholars Charter School", 43.127706, -87.998968],
        ["Milwaukee School of Languages", 43.075946, -88.018573],
        ["Milwaukee Seventh Day Adventist School", 43.075214, -87.987875],
        ["Milwaukee Sign Language Elementary", 43.138260, -88.009598],
        ["Milwaukee Spanish Immersion", 42.993997, -87.983603],
        ["Morgandale Elementary", 42.978550, -87.935707],
        ["Mother of Good Counsel School", 43.053026, -87.964259],
        ["Mount Lebanon Lutheran School", 43.066991, -87.961008],
        ["Mount Olive Christian Day School", 43.052465, -87.948356],
        ["Nativity Jesuit Academy", 43.005387, -87.919065],
        ["Neeskara Elementary", 43.051821, -87.983438],
        ["Ninety-Fifth Street Elementary", 43.084366, -88.030530],
        ["North Division High", 43.066780, -87.925220],
        ["Northwest Catholic School", 43.069114, -87.959142],
        ["Northwest Lutheran School", 43.069185, -87.959088],
        ["Notre Dame School of Milwaukee", 43.020480, -87.917973],
        ["Obama School of Career and Technical Education", 43.109729, -87.967732],
        ["Our Lady Queen of Peace", 43.019600, -87.925091],
        ["Parkview Elementary", 43.307120, -88.000766],
        ["Pathways High", 43.038809, -87.952321],
        ["Penfield Montessori Academy", 43.063391, -87.898383],
        ["Pilgrim Lutheran School", 43.051212, -87.942897],
        ["Pius XI Catholic High School", 43.039242, -87.984575],
        ["Pratt Elementary", 43.110725, -87.933480],
        ["Prince of Peace", 43.025608, -87.947184],
        ["Pulaski High", 42.989296, -87.945724],
        ["Reagan College Preparatory High", 43.046406, -87.921580],
        ["Riley Dual Language Montessori School", 43.022229, -87.916663],
        ["Risen Savior Lutheran School", 43.086316, -87.924854],
        ["River Trail Elementary", 43.076950, -87.912140],
        ["Riverside High", 43.075251, -87.900993],
        ["Riverwest Elementary", 43.077776, -87.896370],
        ["Rocketship Southside Community Prep", 43.019545, -87.922087],
        ["Rocketship Transformation Prep", 43.020514, -87.923095],
        ["Rogers Street Academy", 43.014594, -87.930332],
        ["Roosevelt Middle", 43.043329, -87.914036],
        ["Saint Adalbert School", 43.020048, -87.918610],
        ["Saint Anthony School", 43.019865, -87.915588],
        ["Saint Augustine Preparatory Academy", 43.010520, -87.922622],
        ["Saint Catherine School", 43.038654, -87.968740],
        ["Saint Gregory the Great Parish School", 42.998943, -87.988858],
        ["Saint Joan Antida High School", 43.043135, -87.912150],
        ["Saint John Paul II School", 43.044369, -87.921580],
        ["Saint John's Lutheran School", 43.045510, -87.922650],
        ["Saint Josaphat Parish School", 43.020300, -87.920153],
        ["Saint Joseph Academy", 43.017180, -87.920200],
        ["Saint Marcus Lutheran School", 43.051091, -87.935687],
        ["Saint Margaret Mary School", 43.062510, -87.962510],
        ["Saint Martini Lutheran School", 43.045710, -87.927032],
        ["Saint Matthias Parish School", 42.968250, -87.980800],
        ["Saint Peter Immanuel Lutheran School", 43.108702, -87.944482],
        ["Saint Philip's Lutheran School", 43.045710, -87.928232],
        ["Saint Rafael the Archangel School", 43.010589, -87.939711],
        ["Saint Roman Parish School", 42.933830, -87.921580],
        ["Saint Sebastian School", 43.051010, -87.964750],
        ["Saint Thomas Aquinas Academy", 42.988201, -87.952761],
        ["Saint Vincent Pallotti Catholic School", 43.061028, -87.977317],
        ["Salem Evangelical Lutheran School", 43.051020, -87.929841],
        ["Seeds of Health Elementary Program", 43.015622, -87.954511],
        ["Sherman Elementary", 44.820517, -91.553245],
        ["Shining Star Christian Schools, Inc.", 43.051717, -87.964750],
        ["Siefert Elementary", 43.051062, -87.930633],
        ["Starms Discovery", 43.057107, -87.945741],
        ["Stellar Collegiate Charter School", 43.000546, -87.925259],
        ["Story Elementary", 43.041310, -87.961546],
        ["Stuart Elementary", 43.145285, -88.018729],
        ["Tamarack Waldorf School", 43.057107, -87.945741],
        ["Tenor High", 43.042403, -87.915328],
        ["The City School", 43.075590, -87.911860],
        ["Thoreau Elementary", 43.045950, -89.442373],
        ["Thurston Woods Elementary", 43.125848, -87.955277],
        ["Townsend Street Elementary", 43.080511, -87.966553],
        ["Trowbridge Street School of Great Lakes Studies", 42.991927, -87.885273],
        ["United Community Center Acosta Middle School", 43.020477, -87.917973],
        ["Veritas High", 42.988201, -87.952761],
        ["Victory Christian Academy", 43.049480, -87.944210],
        ["Victory Elementary", 42.936647, -87.943023],
        ["Vieau Elementary", 43.022803, -87.916176],
        ["Vincent High", 43.084070, -88.034240],
        ["Wedgewood Park School", 42.979458, -87.995618],
        ["Westside Academy", 43.055710, -87.958169],
        ["Whitman Elementary", 42.968453, -87.982215],
        ["Whittier Elementary", 42.550521, -87.870593],
        ["WHS Information Technology", 43.065222, -87.968280],
        ["Wisconsin Conservatory of Lifelong Learning", 43.043748, -87.927992],
        ["Wisconsin Lutheran High School", 43.029238, -87.964573],
        ["Word of Life Evangelical Lutheran School", 43.039742, -87.922353],
        ["Yeshiva Elementary School", 43.048310, -87.936209],
        ["Zablocki Elementary", 42.989108, -87.925763]
    ];
      
    const [loading, setLoading] = useState(false);

    const {state} = useLocation();

    useEffect(() => {
        if (state !== null) {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                if(state.cards[0].pipeLineSchools.length!==0){
                    setPipeline(state.cards[0].pipeLineSchools)
                }
                else{
                    setPipeline(pipeLineSchools)
                }
                const updatedCards = state.cards.map(card => {
                    const updatedSchoolData = card.schoolData.map(row => {
                        const school = schoolsLatLong.find(school => school[0] === row['School Name']);
                        if (school) {
                            return { ...row, Lat: school[1], Long: school[2] };
                        }
                        return { ...row, Lat: null, Long: null };
                    });
                    return { ...card, schoolData: updatedSchoolData };
                });
                // console.log(updatedCards,"0000")
                setFileData(updatedCards);
            }, 1000);
        }
    }, [ ]);


    const handleFilterChange = (name, value) => {
        const newFilters = { ...filters };
        if( value !== 'Pipeline Schools'){
            if (name === 'schoolType') {
                if (newFilters.schoolType.includes(value)) {
                    newFilters.schoolType = newFilters.schoolType.filter(type => type !== value);
                } else {
                    newFilters.schoolType.push(value);
                }
            } else {
                newFilters[name] = value;
            }
        }

        if (value === 'Pipeline Schools') {
            if(!newFilters.pipeline){
                newFilters.pipeline = true
            }else{
                newFilters.pipeline = false
            }
        }
        // return newFilters;
        setFilters(newFilters);
    };

    const applySorting = (data) => {
        if (sorting.sortBy === 'Alphabetically (A-Z)') {
            return data.sort((a, b) => a['school_name'].localeCompare(b['school_name']));
        } else if (sorting.sortBy === 'Alphabetically (Z-A)') {
            return data.sort((a, b) => b['school_name'].localeCompare(a['school_name']));
        } else if (sorting.sortBy === 'Enrollment (low to high)') {
            return data.sort((a, b) => a['school_enrollment'] - b['school_enrollment']);
        } else if (sorting.sortBy === 'Enrollment (high to low)') {
            return data.sort((a, b) => b['school_enrollment'] - a['school_enrollment']);
        } else if (sorting.sortBy === 'Non Linear Score (high to low)') {
            return data.sort((a, b) => b['average_weighted_score'] - a['average_weighted_score']);
        } else if (sorting.sortBy === 'Non Linear Score (low to high)') {
            return data.sort((a, b) => a['average_weighted_score'] - b['average_weighted_score']);
        } else if (sorting.sortBy === 'DPI (low to high)') {
            return data.sort((a, b) => a['average_dpi'] - b['average_dpi']);
        } else if (sorting.sortBy === 'DPI (high to low)') {
            return data.sort((a, b) => b['average_dpi'] - a['average_dpi']);
        } else {
            return data;
        }
    };
    const handleSorting = (e) => {
        setSorting({sortBy:e.target.value})
    }

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

    const aggregateSchoolsByType = (data) => {
        const schools = [];

        schoolTypes.forEach(type => {
            const filteredSchools = data.filter(row => row['School Type'] === type);
            if (filteredSchools.length > 0) {
                schools.push(filteredSchools);
            }
        });

        return schools;
    };


    const handlefilters = (data) => {
        return data.filter(row => {
            return (
                (filters.schoolType.length > 0 ? filters.schoolType.includes(row['school_type']) : true) &&
                (filters.pipeline ? pipeline.includes(row['school_name']) : true) &&
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
    

    const addCalculatedFields = (data, file) => {
        const renamedData = data.map(row => ({
            ...row, 
            ELA_achievement: parseFloat(row[file.mapping['School ELA Achievement Score']]),
            math_achievement: parseFloat(row[file.mapping['School Mathematics Achievement Score']]),
            ELA_growth: parseFloat(row[file.mapping['School ELA Growth Score']]),
            math_growth: parseFloat(row[file.mapping['School Mathematics Growth Score']]),
            graduation: parseFloat(row[file.mapping['School On-Track to Graduation Score']])
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
        let filteredData = data.schoolData.filter(row => row['City'] === 'Milwaukee' || pipeline.includes(row['School Name']));
        const features = [
            'School Name', 'Overall Accountability Score', 'Overall Accountability Rating',
            'School Type', 'School Enrollment', 'School ELA Achievement Score',
            'School Mathematics Achievement Score', 'School ELA Growth Score',
            'School Mathematics Growth Score', 'School On-Track to Graduation Score',
            'Percent Economically Disadvantaged'
        ];

        filteredData = filteredData.filter(row => {
            return features.every(feature => row.hasOwnProperty(feature) && row[feature] !== null && row[feature] !== undefined && row[feature] !== 'NA' || row.hasOwnProperty(data.mapping[feature]) && row[data.mapping[feature]] !== null && row[data.mapping[feature]] !== undefined && row[data.mapping[feature]] !== 'NA');
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
    
    // Apply the function to the JSON data
    const flattenData = (data) => {
        const schoolData = {};
      
        data.flat().forEach(school => {
          const schoolName = school['School Name'];
          if (!schoolData[schoolName]) {
            schoolData[schoolName] = {
              school_name: schoolName,
              recent_year: school['School Year'],
              school_type: school['School Type'],
              school_enrollment: school['School Enrollment'],
              city: school['City'],
              lat: school['Lat'],
              long: school['Long'],
              dpi_score: {
                name: "DPI Score",
                years: [],
                data: []
              },
              weighted_score: {
                name: "Weighted Score",
                years: [],
                data: []
              }
            };
          }
      
          // Check if the year is already in the years array
          if (!schoolData[schoolName].dpi_score.years.includes(school['School Year'])) {
            schoolData[schoolName].dpi_score.years.push(school['School Year']);
            schoolData[schoolName].dpi_score.data.push(school['Overall Accountability Score']);
            schoolData[schoolName].weighted_score.years.push(school['School Year']);
            schoolData[schoolName].weighted_score.data.push(school['nonlinear']);
          }
      
          // Always update recent year to the latest year
          const recentYear = parseInt(schoolData[schoolName].recent_year.split('-')[1], 10);
          const currentYear = parseInt(school['School Year'].split('-')[1], 10);
          if (currentYear > recentYear) {
            schoolData[schoolName].recent_year = school['School Year'];
          }
        });
      
        const formattedData = Object.values(schoolData).map(school => {
          const totalDpiScore = school.dpi_score.data.reduce((a, b) => a + b, 0);
          const totalWeightedScore = school.weighted_score.data.reduce((a, b) => a + b, 0);
          const yearsCount = school.dpi_score.data.length;
      
          return {
            ...school,
            average_dpi: totalDpiScore / yearsCount,
            average_weighted_score: totalWeightedScore / yearsCount
          };
        });
      
        return formattedData;
      };
      
    // Output the filtered data
    const renderCardData = () => {
        let aggregatedData = [];

        fileData.forEach((file)=>{
            const filteredData = filterDataOverAll(file, pipeline);
            const calculatedData = addCalculatedFields(filteredData, file);
            aggregatedData.push(calculatedData);
        })
        console.log(aggregatedData,"--aggregatedData----")

        const flattenedData = flattenData(aggregatedData);
        console.log(flattenedData,"--flattenData----")
        const filterAppliedData  = handlefilters(flattenedData);
        const sortedData  = applySorting(filterAppliedData);
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        return { paginatedData: sortedData.slice(startIndex, endIndex), calculatedData: sortedData, calculatedData2: flattenedData, aggregatedData : aggregatedData };
    };

    const rowsPerPage = 10;
    const totalPages = Math.ceil(renderCardData().calculatedData.length / rowsPerPage);
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

    const location = useLocation();
    const currentPath = location.pathname;
    const updateLastPathSegment = (currentPath, newSegment) => {
        const pathArray = currentPath.split('/');
        if (pathArray.length > 1) {
            pathArray[pathArray.length - 1] = newSegment;
            return pathArray.join('/');
        }
        return currentPath;
    };
    const navigate = useNavigate();

    const handleNavigateHome = () => {
        navigate(`/`);
    };
    return (
        <div className='homepage'>
            {loading ? (
                <Loader />
            ) : (
                    <div className='school-cards'>
                                                <div className='navigate_to_upload_initials' onClick={()=>{handleNavigateHome()}}>
                            <span > &#x2190; Go back to Upload section</span>
                            </div>
                        <div className='schools-utilities'>
                            {fileData.length > 0 && (
                                <div className='schools-utilities-wrapper'>
                                    <Link to={updateLastPathSegment(currentPath,'home')}>
                                    <div className='schools-utilities-compare-wrapper' onClick={()=>setCurrentTab('Home')}>
                                        <div className='schools-utilities-compare'>
                                            <img className='schools-utilities-compare-icon' src={home} />
                                            <span className='schools-utilities-compare-text' style={{color: currentTab==='Home' ? '#3e4ee1' : null, fontWeight: currentTab==='Home' ? 600 : 200}}>Home</span>
                                        </div>
                                        {currentTab === 'Home' ? <div className='active_tab'></div> : null}
                                        </div>
                                    </Link>

                                    <Link to={updateLastPathSegment(currentPath,'calculate-elgibility')}>
                                    <div>
                                    <div className='schools-utilities-calculate' onClick={()=>setCurrentTab('Eligibility')}>
                                            <img className='schools-utilities-calculate-icon' src={calculator} />
                                            <span className='schools-utilities-calculate-text' style={{color: currentTab==='Eligibility' ? '#3e4ee1' : null, fontWeight: currentTab==='Eligibility' ? 600 : 200}}>Visualization</span>
                                        </div>
                                        {currentTab === 'Eligibility' ? <div className='active_tab'></div> : null}
                                    </div>
                                    </Link>

                                    <Link to={updateLastPathSegment(currentPath,'geographical-analytics')}>
                                    <div>
                                    <div className='schools-utilities-geo' onClick={()=>setCurrentTab('Geographical analytics')}>
                                            <img className='schools-utilities-geo-icon' src={geo} />
                                            <span className='schools-utilities-geo-text' style={{color: currentTab==='Geographical analytics' ? '#3e4ee1' : null, fontWeight: currentTab==='Geographical analytics' ? 600 : 200}}>Map</span>
                                        </div>
                                        {currentTab === 'Geographical analytics' ? <div className='active_tab'></div> : null}
                                    </div>
                                    </Link>

                                    <Link to={updateLastPathSegment(currentPath,'compare-schools')}>
                                    <div>
                                    <div className='schools-utilities-compare' onClick={()=>setCurrentTab('Compare Schools')}>
                                            <img className='schools-utilities-compare-icon' src={schools} />
                                            <span className='schools-utilities-compare-text' style={{color: currentTab==='Compare Schools' ? '#3e4ee1' : null, fontWeight: currentTab==='Compare Schools' ? 600 : 200}}>Compare Schools</span>
                                        </div>
                                        {currentTab === 'Compare Schools' ? <div className='active_tab'></div> : null}
                                    </div>
                                    </Link>

                                    <Link to={updateLastPathSegment(currentPath,'general-analytics')}>
                                    <div>
                                    <div className='schools-utilities-analytics' onClick={()=>setCurrentTab('General Analysis')}>
                                            <img className='schools-utilities-analytics-icon' src={analysis} />
                                            <span className='schools-utilities-analytics-text' style={{color: currentTab==='General Analysis' ? '#3e4ee1' : null, fontWeight: currentTab==='General Analysis' ? 600 : 200}}>General Analysis</span>
                                        </div>
                                        {currentTab === 'General Analysis' ? <div className='active_tab'></div> : null}
                                    </div>
                                    </Link>
                                </div>
                            )}
                            {!hideFilters &&  <div className='navbar_filters'>
                                            <CheckboxList title="I'm looking for School Type" options={schoolTypes} checkedList={filters.schoolType} onCheckboxChange = {handleFilterChange} filterType={'schoolType'} />
                                            </div> }
                        </div>
                        <Routes>
                            <Route path="/home" element={
                                <React.Fragment>
                                    {fileData.length > 0 && (
                                        <>
                                            <div className='filter-header'>
                                                <div className='filter-header-wrapper'>
                                                    <div className='filter-header-chips-result-count-wrapper'>
                                                        <div className='filter-header-total-no-result'>No of schools <span>{renderCardData().calculatedData.length}</span></div>
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
                                                        <select name="locationType" onChange={(e)=>handleSorting(e)}>
                                                            <option value="Alphabetically (A-Z)">{`Alphabetically (A-Z)`}</option>
                                                            <option value="Alphabetically (Z-A)">{`Alphabetically (Z-A)`}</option>
                                                            <option value="Non Linear Score (low to high)">{`Non Linear Score (low to high)`}</option>
                                                            <option value="Non Linear Score (high to low)">{`Non Linear Score (high to low)`}</option>
                                                            <option value="DPI (low to high)">{`DPI (low to high)`}</option>
                                                            <option value="DPI (high to low)">{`DPI (high to low)`}</option>
                                                            <option value="Enrollment (low to high)">{`Enrollment (low to high)`}</option>
                                                            <option value="Enrollment (high to low)">{`Enrollment (high to low)`}</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='school-cards-sidenav-wrapper'>
                                                <div className='cards-container-2'>
                                                    {renderCardData().paginatedData.map((row, rowIndex) => (
                                                        <div key={rowIndex} className="card">
                                                            <div className="card-content">
                                                                <SmallMap 
                                                                    height = {'200px'}
                                                                    width = {'200px'}
                                                                    minWidth = {'200px'}
                                                                    maxWidth = {'200px'}
                                                                    zoomControl= {false}
                                                                lat={!isColumnBlank(row, 'lat') ? row['lat'] : 42.9768124833109} lng={!isColumnBlank(row, 'long') ? row['long'] : -88.0103937245483} />
                                                                <div className='card-content-main-info-2'>
                                                                <Link to={updateLastPathSegment(currentPath,'school')} state={JSON.stringify(row)}>
                                                                    {row['school_name']}
                                                                </Link>
                                                                    <div className='card-content-main-info-meta'>
                                                                        <div className='card-content-main-info-school-type'>{row['school_type']}</div>
                                                                    </div>
                                                                    <div className='card-content-main-info-school-type'>{row['city']}</div>
                                                                </div>
                                                                <div className='card-content-charts'>
                                                                    <CompareMultipleSeriesChart width={300} height={150} row = {row}/>
                                                                </div>
                                                                <div className='card-content-other-info'>
                                                                <div className='card-content-other-info-3'>
                                                                        <div className='card-content-other-info-1-key'>Avg. Weighted Score</div>
                                                                        <div className='card-content-other-info-1-value'><span className='card-content-other-info-1-rating'>{getRatings(limitToTwoDecimals(row.average_weighted_score))}</span>{limitToTwoDecimals(row.average_weighted_score)}</div>
                                                                    </div>
                                                                    <div className='card-content-other-info-3'>
                                                                        <div className='card-content-other-info-1-key'>Avg. DPI Score</div>
                                                                        <div className='card-content-other-info-1-value'><span className='card-content-other-info-1-rating'>{getRatings(row['average_dpi'])}</span><span>{limitToTwoDecimals(row['average_dpi'])}</span></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='card-content-nav'>
                                                                <div className='ratings'></div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <div>
                                                    {renderCardData().calculatedData.length === 0 ? <div className='no_data_found'>No data found</div> : null}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="pagination">
                                                {renderPagination()}
                                            </div>
                                        </>
                                    )}
                                </React.Fragment>
                            } />
                            <Route path="/school" element={<MultiYearSchoolDetail />} />
                            <Route path="/calculate-elgibility" element={fileData.length > 0 && <MultiYearEligibilityCalculator filters={filters} fileData={fileData} schoolNames={pipeline} aggregatedData = {renderCardData().aggregatedData}/>} />
                            <Route path="/general-analytics" element={fileData.length > 0 && <MultiYearGeneralAnalytics data={renderCardData().aggregatedData} filters={filters} setHideFilters={setHideFilters}/>} />
                            <Route path="/geographical-analytics" element={fileData.length > 0 && <MultiYearGeographicalAnalytics data={fileData} schoolNames={pipeline} calculatedData={renderCardData().aggregatedData} filters={filters}/>} />
                            <Route path="/compare-schools" element={fileData.length > 0 && <MultiYearSchoolComparisonContainer schools={renderCardData().aggregatedData} filters={filters} setHideFilters={setHideFilters}/>}  />
                        </Routes>
                    </div>
            )}
        </div>
    );
};

export default MultiYearHomePage;
