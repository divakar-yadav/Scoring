import './SchoolDetail.css';
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
const SchoolDetail = ( )=> {
  const {state} = useLocation();
  console.log(JSON.parse(state),"state")
  const row = JSON.parse(state)
  return (
    <div className="SchoolDetail">
          <div className='school_name'>{row['School Name']}</div>
          <div className='school_type'>{row['School Type']}</div>
          <div className='school_type'>{row['City']}</div>
          {/* <div className='school_type'>{row['Locale description']}</div> */}
          <MathematicsProficiency row = {row}/>
          <ElaProficiency row = {row} />
          {/* <GenderEnrollmentChart/> */}
          <StudentDiversityChart row = {row}/>
          <StudentsWithDisabilitiesChart row= {row}/>
          <EconomicallyDisadvantagedChart row = {row}/>

          <EnglishLearners row = {row}/>
          <OpenEnrolment row = {row}/>

          {/* <SubjectProficiencyChart row = {row}/> */}
          <TeacherStatistics row={row}/>
    </div>
  );
}

export default SchoolDetail;