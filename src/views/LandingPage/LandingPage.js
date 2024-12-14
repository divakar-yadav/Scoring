import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import single_year from '../../assets/single_year.png';
import multiple_year from '../../assets/multiple_years.png';
import JsonDisplay from '../../components/JsonDisplay/JsonDisplay';
import TextDisplay from '../../components/TextDisplay/TextDisplay';

const jsonData = {
  "School Name": "School Name",
  "Overall Accountability Score": "Overall Accountability Score",
  "Overall Accountability Rating": "Overall Accountability Rating",
  "School Type": "School Type",
  "School Enrollment": "School Enrollment",
  "School ELA Achievement Score": "School ELA Achievement Score",
  "School Mathematics Achievement Score": "School Mathematics Achievement Score",
  "School ELA Growth Score": "School ELA Growth Score",
  "School Mathematics Growth Score": "School Mathematics Growth Score",
  "School On-Track to Graduation Score": "School On-Track to Graduation Score",
  "Percent Economically Disadvantaged": "Percent Economically Disadvantaged",
  "School Achievement Score": "School Achievement Score",
  "School Growth Score": "School Growth Score",
  "School Percent Proficient ELA": "School Percent Proficient ELA {Year}",
  "School Percent Proficient Mathematics": "School Percent Proficient Mathematics {Year}",
  "k1": 0.6,
  "k2": 0.3,
  "k3": 0.2,
};

const textData = `
Bruce Guadalupe
Forest Home Elementary
Milwaukee College Preparatory School -- 36th Street Campus
Milwaukee College Preparatory School -- 38th Street
Milwaukee College Preparatory School -- Lloyd Street
Milwaukee College Preparatory School: Lola Rowe North Campus
Milwaukee Environmental Science Academy
Notre Dame School of Milwaukee
Prince of Peace
Rocketship Southside Community Prep
Rocketship Transformation Prep
Saint Marcus Lutheran School
Stellar Collegiate Charter School
United Community Center Acosta Middle School
Wedgewood Park School
Carmen High School of Science and Technology South Campus
Carmen High School of Science and Technology Southeast Campus
Carmen Middle/High School of Science and Technology Northwest Campus
Carmen Middle School South
Cristo Rey Jesuit Milwaukee High School
Dr Howard Fuller Collegiate Academy
King International
Reagan College Preparatory High
HAPA-Hmong American Peace Academy K3-12
Milwaukee Academy of Science
Saint Augustine Preparatory Academy
Kingdom Prep Lutheran High School
Pilgrim Lutheran School
Golda Meir School
`;

const note = `
# Note

This file serves as a **reference template** where both **Fixed** and **Variable** fields are initially identical.

After downloading this file:

1. **Update the Variable fields** to match the **column names** from the data file.
2. Ensure that the updates are made **specific to each year** as required.
`;

const LandingPage = () => {
  return (
    <div className="landingPage">
      <div className="header_text_product_name">EduDash</div>
      <div className="header_text">Analyze with comprehensive data analytics and visual insights</div>
      <div className="landing_page_content">
        <Link to="/single-year" className="landingpage_single_year">
          <div className="landingpage_single_year_wrapper">
            <img className="landingpage_single_year_icon" src={single_year} alt="Single Year" />
            <span className="landingpage_single_year_text">Single Year</span>
          </div>
        </Link>
        <Link to="/multiple-years" className="landingpage_multiple_year">
          <div className="landingpage_multiple_year_wrapper">
            <img className="landingpage_multiple_year_icon" src={multiple_year} alt="Multiple Years" />
            <span className="landingpage_multiple_year_text">Multiple Years</span>
          </div>
        </Link>
      </div>
      <div className="instructions_container">
        <h1>Dashboard Rendering Instructions</h1>

        <h2>1. File Accessibility:</h2>
        <p>Ensure all required files are accessible while rendering the dashboard.</p>

        <h2>2. Rendering for a Single Year:</h2>
        <p>If you want to render the dashboard for a specific year (e.g., 2022-23), have the following files ready:</p>
        <ul>
          <li>Data file for the year 2022-23</li>
          <li>Mapping file for the year 2022-23</li>
          <li>Pipeline file for the year 2022-23</li>
        </ul>

        <h2>3. Rendering for Multiple Years:</h2>
        <p>
          If you want to render the dashboard for multiple years (e.g., 2022-23, 2021-22, 2020-21), ensure you have
          the following files for each year:
        </p>
        <ul>
          <li>Data file</li>
          <li>Mapping file</li>
          <li>Pipeline file</li>
        </ul>

        <h2>Example:</h2>
        <p>For the year 2022-23:</p>
        <ul>
          <li>Data file for 2022-23</li>
          <li>Mapping file for 2022-23</li>
          <li>Pipeline file for 2022-23</li>
        </ul>

        <p>For the year 2021-22:</p>
        <ul>
          <li>Data file for 2021-22</li>
          <li>Mapping file for 2021-22</li>
          <li>Pipeline file for 2021-22</li>
        </ul>

        <p>For the year 2020-21:</p>
        <ul>
          <li>Data file for 2020-21</li>
          <li>Mapping file for 2020-21</li>
          <li>Pipeline file for 2020-21</li>
        </ul>

        <div>
          <div className="instruction_heading">Source for getting data file.</div>
          <a className="instruction_heading_a" target="#" href="https://apps2.dpi.wi.gov/reportcards/home">
            https://apps2.dpi.wi.gov/reportcards/home
          </a>
        </div>
        <div className="instruction_heading">Format for the mapping.txt file </div>

        <div className="mappingfile_note">
          Note - After downloading this file:
          <ul>
            <li>Update the Variable fields to match the column names from the data file.</li>
            <li>Ensure that the updates are made specific to each year as required.</li>
          </ul>
        </div>
        <div className="key-val-text">
          <div className="key-val-text_key">Fixed</div>
          <div className="key-val-text_value">Variables</div>
        </div>

        <JsonDisplay data={jsonData} />
        <div className="instruction_heading">Format for the pipeline_schools.txt file </div>
        <TextDisplay data={textData} />
      </div>
    </div>
  );
};

export default LandingPage;
