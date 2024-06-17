import React from 'react';
import './SchoolComparison.css';

const SchoolComparison = ({ school1, school2 }) => {
  const renderRow = (label, key) => (
    <tr key={key}>
      <th>{label}</th>
      <td>{school1[key] !== "NA" ? school1[key] : "-"}</td>
      <td>{school2[key] !== "NA" ? school2[key] : "-"}</td>
    </tr>
  );

  const parameters = [
    { label: 'School Name', key: 'School Name' },
    { label: 'District Name', key: 'District Name' },
    { label: 'Overall Accountability Score', key: 'Overall Accountability Score' },
    { label: 'Overall Accountability Rating', key: 'Overall Accountability Rating' },
    { label: 'Lowest Grade', key: 'Lowest Grade in the School' },
    { label: 'Highest Grade', key: 'Highest Grade in the School' },
    { label: 'School Type', key: 'School Type' },
    { label: 'School Enrollment', key: 'School Enrollment' },
    { label: 'Percent American Indian or Alaskan Native', key: 'Percent American Indian or Alaskan Native' },
    { label: 'Percent Asian', key: 'Percent Asian' },
    { label: 'Percent Black or African American', key: 'Percent Black or African American' },
    { label: 'Percent Hispanic/Latino', key: 'Percent Hispanic/Latino' },
    { label: 'Percent Native Hawaiian or Other Pacific Islander', key: 'Percent Native Hawaiian or Other Pacific Islander' },
    { label: 'Percent White', key: 'Percent White' },
    { label: 'Percent Two or More Races', key: 'Percent Two or More Races' },
    { label: 'Percent Students with Disabilities', key: 'Percent Students with Disabilities' },
    { label: 'Percent Economically Disadvantaged', key: 'Percent Economically Disadvantaged' },
    { label: 'Percent English Learners', key: 'Percent English Learners' },
    { label: 'Percent School Choice Program', key: 'Percent School Choice Program' },
    { label: 'Percent Open Enrollment', key: 'Percent Open Enrollment' },
    { label: 'School Achievement Score', key: 'School Achievement Score' },
    { label: 'School ELA Achievement Score', key: 'School ELA Achievement Score' },
    { label: 'School Mathematics Achievement Score', key: 'School Mathematics Achievement Score' },
    { label: 'School Growth Score', key: 'School Growth Score' },
    { label: 'School ELA Growth Score', key: 'School ELA Growth Score' },
    { label: 'School Mathematics Growth Score', key: 'School Mathematics Growth Score' },
    { label: 'School Target Group Outcomes Score', key: 'School Target Group Outcomes Score' },
    { label: 'School Target Group Achievement Score', key: 'School Target Group Achievement Score' },
    { label: 'School Target Group Growth Score', key: 'School Target Group Growth Score' },
    { label: 'School Target Group Chronic Absenteeism Score', key: 'School Target Group Chronic Absenteeism Score' },
    { label: 'School Target Group Attendance Score', key: 'School Target Group Attendance Score' },
    { label: 'School On-Track to Graduation Score', key: 'School On-Track to Graduation Score' },
    { label: 'School Chronic Absenteeism Rate Score', key: 'School Chronic Absenteeism Rate Score' },
    { label: 'School Attendance Rate Score', key: 'School Attendance Rate Score' },
    { label: 'School 3rd Grade ELA Achievement Score', key: 'School 3rd Grade ELA Achievement Score' },
    { label: 'School 8th Grade Mathematics Achievement Score', key: 'School 8th Grade Mathematics Achievement Score' },
  ];

  return (
    <div className="school-comparison">
      <h2>School Comparison</h2>
      <table>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>{school1['School Name']}</th>
            <th>{school2['School Name']}</th>
          </tr>
        </thead>
        <tbody>
          {parameters.map(param => renderRow(param.label, param.key))}
        </tbody>
      </table>
    </div>
  );
};

export default SchoolComparison;
