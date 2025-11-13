import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './views/LandingPage/LandingPage';
import UploadSingleYear from './views/UploadSingleYear/UploadSingleYear';
import UploadMultipleYears from './views/UploadMultipleYears/UploadMultipleYears';
import HomePage from './views/HomePage/HomePage';
import MultiYearHomePage from './MultipleFilesViews/MultiYearHomePage/MultiYearHomePage';

const App = ()=> {
  return (
    <Router basename="/scoring">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/single-year" element={<UploadSingleYear />} />
        <Route path="/single-year/*" element={< HomePage/>} />
        <Route path="/multiple-years" element={<UploadMultipleYears />} />
        <Route path="/multiple-years/*" element={<MultiYearHomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
