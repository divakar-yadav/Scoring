import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import single_year from '../../assets/single_year.png';
import multiple_year from '../../assets/multiple_years.png';

const LandingPage = () => {
  return (
    <div className="landingPage">
      <div className='header_text_product_name'>EduDash</div>
      <div className='header_text'>Analyze with comprehensive data analytics and visual insights</div>
      <div className='landing_page_content'>
      <Link to="/single-year" className='landingpage_single_year'>
        <div className='landingpage_single_year_wrapper'>
          <img className='landingpage_single_year_icon' src={single_year} alt="Single Year"/>
            <span className='landingpage_single_year_text'>Single Year</span>
            <span className='landingpage_single_year_arrow'>&#8594;</span>
        </div>
        </Link>
        <Link to="/multiple-years" className='landingpage_multiple_year'>
        <div className='landingpage_multiple_year_wrapper'>
          <img className='landingpage_multiple_year_icon' src={multiple_year} alt="Multiple Years"/>
            <span className='landingpage_multiple_year_text'>Multiple Years</span>
            <span className='landingpage_single_year_arrow'>&#8594;</span>
        </div>
        </Link>
      </div>
      <div class="instructions_container">
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
        <p>If you want to render the dashboard for multiple years (e.g., 2022-23, 2021-22, 2020-21), ensure you have the following files for each year:</p>
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
    </div>
    </div>
  );
}

export default LandingPage;
