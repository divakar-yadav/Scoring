import React from 'react';
import './TextDisplay.css';

// const textData = `Your text content goes here.
// It can be multiple lines.
// Each line will be displayed as is.`;


const TextDisplay = ({ data }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(data).then(() => {
      alert('Text copied to clipboard!');
    }, (err) => {
      console.error('Failed to copy: ', err);
    });
  };

  const handleDownload = () => {
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pipeline_schools.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="text-display">
      <button className="copy-button" onClick={handleCopy}>Copy </button>
      <button className="download-button" onClick={handleDownload}>Download </button>
      <div className="text-content">
        {data.split('\n').map((line, index) => (
          <div key={index} className="text-line">{line}</div>
        ))}
      </div>
    </div>
  );
};

export default TextDisplay;