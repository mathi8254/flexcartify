import React, { useState } from 'react';
import Papa from 'papaparse'; 
import './BulkProductUpload.css';

const BulkProductUpload = () => {
    const [csvFile, setCsvFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (event) => {
        setCsvFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!csvFile) {
            setMessage('Please upload a CSV file.');
            return;
        }

        // Prepare FormData with the CSV file
        const formData = new FormData();
        formData.append('file', csvFile);

        // Perform the upload
        try {
            const response = await fetch('https://localhost:7251/api/Productsap/bulk-upload/csv', {
                method: 'POST',
                headers: {
                    // 'Content-Type' is not needed because FormData sets it automatically
                },
                body: formData,
            });

            if (response.ok) {
                setMessage('Products uploaded successfully.');
            } else {
                const errorText = await response.text();
                setMessage(`Upload failed: ${errorText}`);
            }
        } catch (error) {
            setMessage(`Error uploading products: ${error.message}`);
        }
    };

    return (
        <div className="bulk-upload-container">
            <h2 className="upload-title">Bulk Product Upload</h2>
            <input 
                type="file" 
                accept=".csv" 
                className="file-input" 
                onChange={handleFileChange} 
            />
            <button className="upload-button" onClick={handleUpload}>
                Upload
            </button>
            {message && <p className="upload-message">{message}</p>}
        </div>
    );
};

export default BulkProductUpload;
