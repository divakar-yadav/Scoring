import React, { useState } from 'react';

const ConfigManagement = () => {
  const [file, setFile] = useState(null);
  const [fileContent, setFileContent] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = (event) => {
      setFileContent(event.target.result);
    };
    reader.readAsText(selectedFile);
  };

  const handleFileSave = () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const blob = new Blob([fileContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = file.name;
    link.click();

    alert('File saved successfully');
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept=".txt" />
      <button onClick={handleFileSave}>Save File</button>
    </div>
  );
};

export default ConfigManagement;
