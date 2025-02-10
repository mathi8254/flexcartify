import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import CouponInput from './CouponInput'; 
import { Modal, Button } from 'react-bootstrap';

const Cart = ({ userId, userDetails }) => {
    const [cart, setCart] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [products, setProducts] = useState({});
    const [discountAmount, setDiscountAmount] = useState(0); 
    const [showModal, setShowModal] = useState(false);
    const [customerDetails, setCustomerDetails] = useState({});
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        const fetchCart = async () => {
            if (!userId) return;

            try {
                const response = await fetch(`https://localhost:7251/api/CartItem/${userId}`);
                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Error fetching cart:', errorText);
                    throw new Error('Failed to fetch cart');
                }
                const data = await response.json();
                setCart(data);

                const initialQuantities = data.reduce((acc, item) => {
                    acc[item.productId] = item.quantity;
                    return acc;
                }, {});
                setQuantities(initialQuantities);

                const productsMap = {};
                for (const item of data) {
                    const productResponse = await fetch(`https://localhost:7251/api/Productsap/${item.productId}`);
                    if (!productResponse.ok) {
                        const errorText = await productResponse.text();
                        console.error(`Error fetching product ${item.productId}:`, errorText);
                        continue;
                    }
                    const productData = await productResponse.json();
                    productsMap[productData.id] = productData;
                }
                setProducts(productsMap);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchCart();
    }, [userId]);

    const showAlertMessage = (message) => {
        setAlertMessage(message);
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 2000);
    };

    const getQuantity = (productId) => {
        return quantities[productId] || 0;
    };

    const totalPrice = cart.reduce((acc, item) => {
        const product = products[item.productId];
        const price = product ? product.price.new : 0;
        return acc + (price * getQuantity(item.productId));
    }, 0);

   
    const totalDiscount = cart.reduce((acc, item) => {
        const product = products[item.productId];
        const oldPrice = product ? product.price.old : 0;
        const newPrice = product ? product.price.new : 0;
        return acc + (oldPrice ? (oldPrice - newPrice) * getQuantity(item.productId) : 0);
    }, 0);

   
    const deliveryCharges = 0;

    
    const handleQuantityChange = async (productId, change) => {
        const newQuantity = Math.max((quantities[productId] || 0) + change, 0);
        setQuantities(prev => ({
            ...prev,
            [productId]: newQuantity
        }));

        if (change > 0) {
            showAlertMessage('Product added to cart!');
        }

        const response = await fetch(`https://localhost:7251/api/CartItem/${userId}/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, productId, quantity: newQuantity }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error updating cart item:', errorText);
            throw new Error('Failed to update cart item');
        }
    };

    const handleRemoveFromCart = async (productId) => {
        try {
            await fetch(`https://localhost:7251/api/CartItem/${userId}/${productId}`, {
                method: 'DELETE',
            });
            setCart(cart.filter(item => item.productId !== productId));
        } catch (error) {
            console.error('Failed to remove item from cart:', error);
        }
    };

    const handlePlaceOrder = () => {
        setCustomerDetails({
            name: userDetails.firstName,
            email: userDetails.email,
            address: userDetails.address,
        });
        setShowModal(true);
    };

    const handleConfirmOrder = async () => {
        const orderItems = cart.map(item => {
            const product = products[item.productId];
            return {
                orderItemId: 0,
                orderId: 0,
                productId: product.id,
                quantity: quantities[item.productId],
                price: product.price.new,
            };
        });

        const orderData = {
            orderId: 0,
            userId: userId,
            customerName: customerDetails.name,
            customerEmail: customerDetails.email,
            customerAddress: customerDetails.address,
            totalAmount: totalPrice - discountAmount, 
            discountAmount: discountAmount,
            orderDate: new Date().toISOString(),
            items: orderItems,
        };

        try {
            const response = await fetch('https://localhost:7251/api/Orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error placing order:', errorText);
                alert('Failed to place order. Please try again.');
                return;
            }

            const responseData = await response.json();
            console.log('Order placed successfully:', responseData);
            setCart([]);
            alert('Order placed successfully!');
            setShowModal(false);
        } catch (error) {
            console.error('Error confirming order:', error);
            alert('Failed to place order. Please try again.');
        }
    };

    
    const finalTotalPrice = totalPrice + deliveryCharges - discountAmount;

    return (
        <div className="container mt-3">
            <h1>Your Cart</h1>
            {showAlert && <div className="alert alert-success">{alertMessage}</div>}
            {cart.length === 0 ? (
                <p>No items in the cart.</p>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map(item => {
                            const product = products[item.productId];
                            return (
                                <tr key={item.productId}>
                                    {product && (
                                        <>
                                            <td>
                                                <img src={product.imageUrl} alt={product.ListItem} style={{ width: "50px", marginRight: "10px" }} />
                                            </td>
                                            <td>
                                                <Link to={`/products/${item.productId}`}>
                                                    {product.listItem}
                                                </Link>
                                            </td>
                                            <td>₹{product.price.new}</td>
                                            <td>
                                                <button onClick={() => handleQuantityChange(item.productId, 1)}>+</button>
                                                <span>{quantities[item.productId] || 0}</span>
                                                <button onClick={() => handleQuantityChange(item.productId, -1)}>-</button>
                                            </td>
                                            <td>
                                                <button onClick={() => handleRemoveFromCart(item.productId)} className="btn btn-danger">Remove</button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}

            <div className="row" style={{ width: "150%" }}>
                <Card style={{ width: '18rem' }}>
                    <Card.Header><h5>Price Details</h5></Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <p>Total price: ₹{totalPrice}</p>
                            <p>Discount: ₹{discountAmount}</p>
                            <p>Delivery Charges: ₹{deliveryCharges}</p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h6>Total Amount: ₹{finalTotalPrice}</h6>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <p style={{ color: "green" }}>You will save ₹{totalDiscount} on this order</p>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </div>
            <CouponInput setDiscountAmount={setDiscountAmount} />
            <Link to="/" className="btn btn-primary mt-3">Continue Shopping</Link>
            &nbsp;
            <Button variant="success" onClick={handlePlaceOrder}>Place Order</Button>

            
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Customer Details</h5>
                    <p>Name: {customerDetails.name}</p>
                    <p>Email: {customerDetails.email}</p>
                    <p>Mobile No: {customerDetails.mobile}</p>
                    <p>Address: {customerDetails.address}</p>
                    <p>Total Amount: ₹{finalTotalPrice}</p>
                    <p>Payment Method: Cash On Delivery</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleConfirmOrder}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Cart;
