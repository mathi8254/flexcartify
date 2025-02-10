import React from 'react';
import { Link } from 'react-router-dom';
import BulkProductUpload from '../CsvFile/BulkProductUpload';

const AdminPanel = ({ isAdmin }) => {
    return (
        <div>

            <div className='container mt-4' >
                <div className="row">
                    <div className="col-md-2 mb-2" style={{ marginTop: "50px", paddingBottom: "400px", marginRight: "30px" }}>
                        <div className="card h-100">
                            <img className="card-img-top" src={"https://cdn1.iconfinder.com/data/icons/user-interface-664/24/User-1024.png"} alt={"https://cdn1.iconfinder.com/data/icons/user-interface-664/24/User-1024.png"} />
                            <div className="card-body p-4 text-center">

                                <Link className="nav-link active" to="/userinfo"><h5 className="fw-bolder">User Info</h5></Link>


                            </div>
                        </div>
                    </div>
                    <div className="col-md-2 mb-2" style={{ marginTop: "50px", paddingBottom: "400px", marginRight: "30px" }}>
                        <div className="card h-100">
                            <img className="card-img-top" src={"https://cdn0.iconfinder.com/data/icons/basic-e-commerce-line-color/48/Package_box_add-1024.png"} alt={"https://cdn0.iconfinder.com/data/icons/basic-e-commerce-line-color/48/Package_box_add-1024.png"} />
                            <div className="card-body p-4 text-center">

                                <Link className="nav-link" to="/products/new"> <h5 className="fw-bolder">Add Product</h5></Link>


                            </div>
                        </div>
                    </div>
                    <div className="col-md-2 mb-2" style={{ marginTop: "50px", paddingBottom: "400px", marginRight: "30px" }}>
                        <div className="card h-100">
                            <img className="card-img-top" src={"https://cdn3.iconfinder.com/data/icons/product-management-outline/60/Product-Stats-business-analytics-1024.png"} alt={"https://cdn3.iconfinder.com/data/icons/product-management-outline/60/Product-Stats-business-analytics-1024.png"} />
                            <div className="card-body p-4 text-center">

                                <Link className="nav-link" to="/stock-management"><h5 className="fw-bolder">Stock Management</h5></Link>


                            </div>
                        </div>
                    </div>
                    <div className="col-md-2 mb-2" style={{ marginTop: "50px", paddingBottom: "400px", marginRight: "30px" }}>
                        <div className="card h-100">
                            <img className="card-img-top" src={"https://cdn4.iconfinder.com/data/icons/aami-web-internet/64/aami6-26-1024.png"} alt={"https://cdn4.iconfinder.com/data/icons/aami-web-internet/64/aami6-26-1024.png"} />
                            <div className="card-body p-4 text-center">

                                <Link className="nav-link" to="/sales-reports"> <h5 className="fw-bolder">Sales Reports</h5></Link>


                            </div>
                        </div>
                    </div>
                    <div className="col-md-2 mb-2" style={{ marginTop: "50px", paddingBottom: "400px" }}>
                        <div className="card h-100">
                            <img className="card-img-top" src={"https://cdn1.iconfinder.com/data/icons/bootstrap-vol-3/16/filetype-csv-1024.png"} alt={"https://cdn1.iconfinder.com/data/icons/bootstrap-vol-3/16/filetype-csv-1024.png"} />
                            <div className="card-body p-4 text-center">

                                <Link className="nav-link" to="/csv"> <h5 className="fw-bolder">Upload CSV</h5></Link>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
}

export default AdminPanel;
