import React, { useState } from "react";
import "./MultipleFileUploadCard.css";
import bin from '../../assets/bin.png';

const MultipleFileUploadCard = (props) => {
  const [yearsData, setYearsData] = useState([]);

  const { id, handleDeleteCard, handleFileUpload } = props;

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
        <label htmlFor={`upload_pipeline_schools_${id}`} className="custom-upload-button">
          Upload Pipeline Schools
        </label>
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
      <div className="UploadMultipleYears_card_delete_button">
        <img onClick={() => handleDeleteCard(id)} className="UploadMultipleYears_card_delete_button_icon" src={bin} alt="Delete" />
      </div>
    </div>
  );
};

export default MultipleFileUploadCard;
