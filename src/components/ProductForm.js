import React, { useState, useEffect } from 'react';
import { createProduct, updateProduct, getProduct } from '../components/ProductService';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const ProductForm = () => {
    const { id } = useParams(); 
    const [product, setProduct] = useState({
        listItem: '',
        price: { old: '', new: '' },
        imageUrl: '',
        rating: '',
        discount: false,
        description: '',
        category: '',
        quantity: 0,
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            if (id) {
                try {
                    const fetchedProduct = await getProduct(id);
                    if (fetchedProduct) {
                        setProduct(fetchedProduct);
                    } else {
                        setError('Product not found');
                    }
                } catch (error) {
                    setError('Failed to fetch product');
                }
            }
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        
        if (name.startsWith('price.')) {
            const key = name.split('.')[1];
            setProduct((prev) => ({
                ...prev,
                price: { ...prev.price, [key]: type === 'number' ? parseFloat(value) : value },
            }));
        } else {
            setProduct((prev) => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await updateProduct(id, product);
            } else {
                await createProduct(product);
            }
            navigate('/');
        } catch (error) {
            console.error('Failed to save product:', error);
            setError('Failed to save product');
        }
    };

    if (error) {
        return <div>{error}</div>; 
    }

    return (
        <div className='container-fluid'>
            <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
                <i className="fa-solid fa-backward"></i> Back
            </button>
            <Form className='mb-3' onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicItem">
                    <Form.Label>List Item</Form.Label>
                    <Form.Control
                        type="text"
                        name="listItem"
                        placeholder="Enter item name"
                        value={product.listItem}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicNewPrice">
                    <Form.Label>Enter New Price</Form.Label>
                    <Form.Control
                        type="number"
                        name="price.new"
                        placeholder="New Price"
                        value={product.price.new}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicOldPrice">
                    <Form.Label>Enter Old Price</Form.Label>
                    <Form.Control
                        type="number"
                        name="price.old"
                        placeholder="Old Price"
                        value={product.price.old}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicImage">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control
                        type="text"
                        name="imageUrl"
                        placeholder="Enter image URL"
                        value={product.imageUrl}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicRating">
                    <Form.Label>Rating (0-5)</Form.Label>
                    <Form.Control
                        type="number"
                        name="rating"
                        min="0"
                        max="5"
                        placeholder="Enter rating"
                        value={product.rating}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicDiscount">
                    <Form.Label>Discount</Form.Label>
                    <Form.Check
                        type="checkbox"
                        name="discount"
                        checked={product.discount}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        placeholder="Enter product description"
                        value={product.description}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCategory">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        type="text"
                        name="category"
                        placeholder="Enter product category"
                        value={product.category}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicQuantity">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                        type="number"
                        name="quantity"
                        placeholder="Enter product quantity"
                        value={product.quantity}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    {id ? "Update Product" : "Add Product"}
                </Button>
            </Form>
        </div>
    );
};

export default ProductForm;
