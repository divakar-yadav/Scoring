import React from 'react';
import './JsonDisplay.css';



const JsonDisplay = ({ data }) => {
    const handleCopy = () => {
      const jsonString = JSON.stringify(data, null, 2);
      navigator.clipboard.writeText(jsonString).then(() => {
        alert('JSON copied to clipboard!');
      }, (err) => {
        console.error('Failed to copy: ', err);
      });
    };
  
    const handleDownload = () => {
      const jsonString = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonString], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'mapping.txt';
      a.click();
      URL.revokeObjectURL(url);
    };
  
    return (
      <div className="json-display">
        <button className="copy-button" onClick={handleCopy}>Copy </button>
        <button className="download-button" onClick={handleDownload}>Download </button>
        <div className="json-content">
          <div className="json-brace">{'{'}</div>
          <div className="json-body">
            {Object.entries(data).map(([key, value], index) => (
              <div key={index} className="json-item">
                <span className="json-key">"{key}":</span>
                <span className="json-value"> "{value}"{index < Object.entries(data).length - 1 ? ',' : ''}</span>
              </div>
            ))}
          </div>
          <div className="json-brace">{'}'}</div>
        </div>
      </div>
    );
  };
export default JsonDisplay;
