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

      uploadFileToS3(file, "data.csv",
        (successMessage) => setNotification(successMessage),
        (errorMessage) => setNotification(errorMessage)
      );

      uploadFileToS3(file, "archive/data_"+Date.now()+".csv"); // Also upload backup data
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
