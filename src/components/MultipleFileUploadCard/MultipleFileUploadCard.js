import React, { useState } from "react";
import "./MultipleFileUploadCard.css";
import bin from '../../assets/bin.png';
import download_icon from '../../assets/download-button_blue.png'
const MultipleFileUploadCard = (props) => {
  const [yearsData, setYearsData] = useState([]);

  const { id, handleDeleteCard, handleFileUpload, hideDeleteButton } = props;


  const textData = `Bruce Guadalupe
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
  Golda Meir School`

  const handleFileChange = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      const fileSize = (file.size / 1024).toFixed(2) + " KB";
      const timestamp = new Date(file.lastModified).toLocaleString();
      const newData = { type, file, fileSize, timestamp };
      setYearsData((prevData) => [...prevData, newData]);
      handleFileUpload(file, id, type);
    }
  };
  const handleDownload = () => {
    const blob = new Blob([textData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pipeline_schools.txt';
    a.click();
    URL.revokeObjectURL(url);
  };
  const handleDelete = (type) => {
    setYearsData((prevData) => prevData.filter((data) => data.type !== type));
  };

  return (
    <div key={id} className="UploadMultipleYears_card">
      <div className="UploadMultipleYears_card_upload_data">
        <input
          type="file"
          id={`upload_data_${id}`}
          onChange={(e) => handleFileChange(e, "data")}
          style={{ display: "none" }}
        />
        <label htmlFor={`upload_data_${id}`} className="custom-upload-button">
          Upload Data
        </label>
        {yearsData.some((data) => data.type === "data") && (
          <div className="file-info">
            <span className="file-info_file_name">
              {yearsData.find((data) => data.type === "data").file.name}
            </span>
            <div className="timestamp_fileSize">
              <span className="timestamp_fileSize_size">
                {yearsData.find((data) => data.type === "data").fileSize}
              </span>
              <span className="timestamp_fileSize_timestamp">
                {yearsData.find((data) => data.type === "data").timestamp}
              </span>
            </div>

            <span
              onClick={() => handleDelete("data")}
              className="delete-button"
            >
              Delete
            </span>
          </div>
        )}
      </div>
      <div className="UploadMultipleYears_card_upload_maping">
        <input
          type="file"
          id={`upload_mapping_${id}`}
          onChange={(e) => handleFileChange(e, "mapping")}
          style={{ display: "none" }}
        />
        <label htmlFor={`upload_mapping_${id}`} className="custom-upload-button">
          Upload Mapping
        </label>
        {yearsData.some((data) => data.type === "mapping") && (
          <div className="file-info">
            <span className="file-info_file_name">
              {yearsData.find((data) => data.type === "mapping").file.name}
            </span>
            <div className="timestamp_fileSize">
              <span className="timestamp_fileSize_size">
                {yearsData.find((data) => data.type === "mapping").fileSize}
              </span>
              <span className="timestamp_fileSize_timestamp">
                {yearsData.find((data) => data.type === "mapping").timestamp}
              </span>
            </div>
            <span
              onClick={() => handleDelete("mapping")}
              className="delete-button"
            >
              Delete
            </span>
            
          </div>
        )}
      </div>
      <div className="UploadMultipleYears_card_upload_pipeline_schools">
        <input
          type="file"
          id={`upload_pipeline_schools_${id}`}
          onChange={(e) => handleFileChange(e, "pipeline_schools")}
          style={{ display: "none" }}
        />
        <div className="default_download_wrapper">
          <span className="default_download" onClick={handleDownload}>pipeline_schools.txt <img className="default_download_icon" src={download_icon} /></span>
          <span className="default_or">OR</span>
          <label htmlFor={`upload_pipeline_schools_${id}`} className="custom-upload-button">
            Update Schools
          </label>
        </div>

        {yearsData.some((data) => data.type === "pipeline_schools") && (
          <div className="file-info">
            <span className="file-info_file_name">
              {yearsData.find((data) => data.type === "pipeline_schools").file.name}
            </span>
            <div className="timestamp_fileSize">
              <span className="timestamp_fileSize_size">
                {yearsData.find((data) => data.type === "pipeline_schools").fileSize}
              </span>
              <span className="timestamp_fileSize_timestamp">
                {yearsData.find((data) => data.type === "pipeline_schools").timestamp}
              </span>
            </div>

            <span
              onClick={() => handleDelete("pipeline_schools")}
              className="delete-button"
            >
              Delete
            </span>
          </div>
        )}
      </div>
      {hideDeleteButton===true ? null :  
            <div className="UploadMultipleYears_card_delete_button">
            <img onClick={() => handleDeleteCard(id)} className="UploadMultipleYears_card_delete_button_icon" src={bin} alt="Delete" />
          </div>
      }           
    </div>
  );
};

export default MultipleFileUploadCard;
