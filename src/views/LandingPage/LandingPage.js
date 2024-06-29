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
    </div>
  );
}

export default LandingPage;
