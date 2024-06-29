import './MultiYearSchoolDetail.css';
import { useLocation } from 'react-router-dom';
import MathematicsProficiency from '../../components/MathematicsProficiency/MathematicsProficiency'
import ElaProficiency from '../../components/ElaProficiency/ElaProficiency'
// import GenderEnrollmentChart from '../../components/GenderEnrollmentChart/GenderEnrollmentChart'
import StudentDiversityChart from '../../components/StudentDiversityChart/StudentDiversityChart'
import EconomicallyDisadvantagedChart from '../../components/EconomicallyDisadvantagedChart/EconomicallyDisadvantagedChart'
import SubjectProficiencyChart from '../../components/SubjectProficiencyChart/SubjectProficiencyChart';
import StudentsWithDisabilitiesChart from '../../components/StudentsWithDisabilitiesChart/StudentsWithDisabilitiesChart';
import TeacherStatistics from '../../components/TeacherStatistics/TeacherStatistics';
import EnglishLearners from '../../components/EnglishLearners/EnglishLearners';
import OpenEnrolment from '../../components/OpenEnrolment/OpenEnrolment';
import { Link } from 'react-router-dom';
import SmallMap from '../../components/SmallMap/SmallMap';

const MultiYearSchoolDetail = ( )=> {
  const {state} = useLocation();
  console.log(JSON.parse(state),"state")
  const row = JSON.parse(state)

  const limitToTwoDecimals = (num) => {
    return parseFloat(num.toFixed(2));
};
  const isColumnBlank = (row, columnName) => {
    if (row.hasOwnProperty(columnName)) {
        const value = row[columnName];
        return value === null || value === undefined || value === "";
    }
    return true;
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

  return (
    <div className="SchoolDetail">
      <Link to='/multiple-years/home'>&#x2190;Back</Link>
      <div className='school_detail_wrapper'>
        <div>
            <div className='school_name'>{row['school_name']}</div>
            <div className='school_type'>{row['school_type']}</div>
            <div className='school_type'>{row['city']}</div>
        </div>
        <div className='SchoolDetail_map_container'>
        <SmallMap 
            height = {'300px'}
            width = {'200px'}
            minWidth = {'400px'}
            maxWidth = {'400px'}
            zoomControl= {true}
          lat={!isColumnBlank(row, 'lat') ? row['lat'] : 42.9768124833109} lng={!isColumnBlank(row, 'long') ? row['long'] : -88.0103937245483} />
        </div>
      </div>

          <div className='school_detail_ratings'>
            <div className='school_detail_ratings_dpi'>
              <div className='school_detail_ratings_dpi_text'>Avg DPI Score</div>
              <span className='school_detail_ratings_dpi_rating'>{getRatings(row['average_dpi'])}</span>
              <span className='school_detail_ratings_dpi_score'>{limitToTwoDecimals(row['average_dpi'])}</span>
            </div>
            <div className='school_detail_ratings_new_score'>
              <div className='school_detail_ratings_new_score_text'>New Score</div>
              <span className='school_detail_ratings_new_score_rating'>{getRatings(limitToTwoDecimals(row.average_weighted_score))}</span>
              <span className='school_detail_ratings_new_score_score'>{limitToTwoDecimals(row.average_weighted_score)}</span>
            </div>
          </div>
          {/* <div className='school_type'>{row['Locale description']}</div> */}


          {/* <SubjectProficiencyChart row = {row}/> */}
    </div>
  );
}

export default MultiYearSchoolDetail;