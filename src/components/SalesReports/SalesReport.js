import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SalesReport = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reportData, setReportData] = useState(null);
    const navigate = useNavigate();

    const handleGenerateReport = async () => {
        try {
            const response = await fetch(`https://localhost:7251/api/Orders/SalesReports?startDate=${startDate}&endDate=${endDate}`);
            if (!response.ok) {
                const errorText = await response.text();
                alert(`Error generating report: ${errorText}`);
                throw new Error('Failed to fetch sales report');
            }
            const data = await response.json();
            setReportData(data);
        } catch (error) {
            console.error(error);
            alert('Error generating report. Please try again.');
        }
    };

    const isValid = startDate && endDate && new Date(startDate) <= new Date(endDate);

    return (
        <div>
            <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
                <i className="fa-solid fa-backward"></i> Back
            </button>
            <h2>Generate Sales Report</h2>
            <div>
                <label>
                    Start Date:
                    <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                </label>
                <label>
                    End Date:
                    <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                </label>
                <button onClick={handleGenerateReport} disabled={!isValid}>Generate Report</button>
            </div>

            {reportData && (
                <div>
                    <h3>Sales Report</h3>
                    <p>Total Orders: {reportData.totalOrders}</p>
                    <p>Total Amount: ₹{reportData.totalAmount}</p>
                    <p>Total Discount: ₹{reportData.totalDiscount}</p>
                    <ul>
                        {reportData.orders.map(order => (
                            <li key={order.orderId}>
                                <h4>Order ID: {order.orderId}</h4>
                                <p>Date: {new Date(order.orderDate).toLocaleString()}</p>
                                <p>Customer: {order.customerName}</p>
                                <p>Total Amount: ₹{order.totalAmount}</p>
                                <p>Discount: ₹{order.discountAmount}</p>
                                <h5>Items:</h5>
                                <ul>
                                    {order.items.map(item => (
                                        <li key={item.productId}>
                                            Product ID: {item.productId}, Quantity: {item.quantity}, Price: ₹{item.price}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SalesReport;
