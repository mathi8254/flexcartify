import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StockManagement = () => {
    const [products, setProducts] = useState([]);
    const [lowStock, setLowStock] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://localhost:7251/api/Productsap');
                const data = await response.json();
                setProducts(data);

                // Check for low stock
                const lowStockProducts = data.filter(product => product.quantity < 10);
                setLowStock(lowStockProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        
        <div>
            <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
                <i className="fa-solid fa-backward"></i> Back
            </button>
            <h2>Stock Management</h2>
            <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Stock Level</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.listItem}</td>
                            <td>{product.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {lowStock.length > 0 && (
                <div className="notification">
                    <h3>Warning: Low Stock Alert!</h3>
                    <ul>
                        {lowStock.map(product => (
                            <li key={product.id}>{product.listItem}: {product.quantity}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default StockManagement;
