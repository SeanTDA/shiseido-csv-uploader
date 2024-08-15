// src/components/FileUploader.js
import React, { useState } from 'react';
import Papa from 'papaparse';
import { uploadFileToS3 } from './S3Service';

function FileUploader({ setFile, setCsvData, validateConditions, allConditionsMet, setNotification }) {
  const [file, setInternalFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setInternalFile(selectedFile);
    setFile(selectedFile);
    if (selectedFile) {
      Papa.parse(selectedFile, {
        complete: (results) => {
          const content = results.data;
          setCsvData(content);
          validateConditions(content);
        },
        header: false
      });
    }
  };

  const handleUpload = () => {
    if (file && allConditionsMet) {
      console.log(process.env.REACT_APP_AWS_ACCESS_KEY_ID, process.env.REACT_APP_AWS_SECRET_ACCESS_KEY);
      uploadFileToS3(file, 
        (successMessage) => setNotification(successMessage),
        (errorMessage) => setNotification(errorMessage)
      );
    }
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      {allConditionsMet && (
        <button onClick={handleUpload}>Upload</button>
      )}
    </div>
  );
}

export default FileUploader;
