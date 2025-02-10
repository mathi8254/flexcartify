import React from 'react'
import BulkProductUpload from '../CsvFile/BulkProductUpload'
import { useNavigate } from 'react-router-dom'

const BulkProductCsv = () => {
    const navigate = useNavigate();
  return (
    <div>
        <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
                <i className="fa-solid fa-backward"></i> Back
            </button>
         
               
                    <h3 style={{textAlign:"center"}}>Upload CSV</h3>
                    <BulkProductUpload />
               
           
    </div>
  )
}

export default BulkProductCsv