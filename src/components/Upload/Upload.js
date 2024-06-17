import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import './Upload.css';
import xlsxicon from '../../assets/xlsx.png'
const Upload = ({ maxFiles, setFileData }) => {
    const [selectedFile, setSelectedFile] = useState([]);

    useEffect(() => {

    }, []);

    const fileSize = (bytes, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };

    const handleChange = (e) => {
        const files = Array.from(e.target.files);
        let newFiles = selectedFile;

        if (maxFiles) {
            const totalAllowedFiles = maxFiles - newFiles.length;
            newFiles = [...newFiles, ...files.slice(0, totalAllowedFiles)];
            if (files.length > totalAllowedFiles) {
                alert(`You can only upload ${maxFiles} files. Additional files have been ignored.`);
            }
        } else {
            newFiles = [...newFiles, ...files];
        }

        const filesWithDetails = newFiles.map((file, index) => {
            if (file && file instanceof File) {
                return {
                    id: index,
                    filename: file.name,
                    filetype: file.type,
                    file,
                    fileimage: URL.createObjectURL(file),
                    datetime: file.lastModifiedDate.toLocaleString('en-IN'),
                    filesize: fileSize(file.size)
                };
            } else {
                console.error('Invalid file detected:', file);
                return null;
            }
        }).filter(file => file !== null);

        setSelectedFile(filesWithDetails);
        readExcel(filesWithDetails);
    };

    const readExcel = (files) => {
        files.forEach(fileDetail => {
            const { file } = fileDetail;
            if (file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const data = new Uint8Array(event.target.result);
                    const workbook = XLSX.read(data, { type: 'array' });
                    const sheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[sheetName];
                    const jsonData = XLSX.utils.sheet_to_json(worksheet);
                    // console.log(`Number of rows: ${jsonData.length}`); // Log the number of rows here
                    setFileData(jsonData);
                };
                reader.readAsArrayBuffer(file);
            }
        });
    };

    const deleteFile = (id) => {
        if (window.confirm("Are you sure you want to delete this file?")) {
            const remainingFiles = selectedFile.filter(file => {
                if (file.id !== id) {
                    return true;
                } else {
                    URL.revokeObjectURL(file.fileimage);
                    return false;
                }
            });
            setSelectedFile(remainingFiles);
    
            // Reload the page
            window.location.reload();
        }
    };
    

    return (
        <div className="fileupload-view">
            <div className="row justify-content-center m-0">
                <div className="col-md-6">
                    <div className="upload-card mt-5">
                        <div className="card-body">
                            <div className="kb-data-box">
                            {!selectedFile.length > 0 ? 
                                <div className="kb-modal-data-title">
                                    <div className="kb-data-title">
                                        <h6>Upload the data</h6>
                                    </div>
                                </div>
                                : null}
                                <form>
                                    {!selectedFile.length > 0 ?
                                    <div className="kb-file-upload">
                                        <div className="file-upload-box">
                                            <input
                                                type="file"
                                                id="fileupload"
                                                className="file-upload-input"
                                                onChange={handleChange}
                                                multiple
                                            />
                                            <span>Drag and drop or <span className="file-link">Choose your files</span></span>
                                        </div>
                                    </div> : null}
                                    <div className="kb-attach-box mb-3">
                                        {selectedFile.map((data, index) => (
                                            <div className="file-atc-box" key={data.id}>
                                                <div className="file-image">
                                                    {data.filename.match(/.(jpg|jpeg|png|gif|svg)$/i) ? (
                                                        <img src={data.fileimage} alt="" />
                                                    ) : (
                                                        <img src={xlsxicon} alt="xlsx" />
                                                    )}
                                                </div>
                                                <div className="file-detail">
                                                    <h6>{data.filename}</h6>
                                                    <p>
                                                        <span>Size: {data.filesize}</span>
                                                        <span className="ml-2">Modified Time: {data.datetime}</span>
                                                    </p>
                                                    <div className="file-actions">
                                                        <button type="button" className="file-action-btn" onClick={() => deleteFile(data.id)}>Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Upload;
