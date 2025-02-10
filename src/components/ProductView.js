import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct } from './ProductService'; 
import './ProductView.css';

const ProductView = ({ addToCart, removeFromCart, cart, user }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const fetchedProduct = await getProduct(id);
                if (!fetchedProduct) {
                    setError('Product not found');
                    return;
                }
                setProduct(fetchedProduct);
            } catch (err) {
                setError('Failed to fetch product details');
                console.error(err);
            }
        };

        fetchProduct();
    }, [id]);

    const isInCart = Array.isArray(cart) && cart.some(item => item.productId === product?.id);

    const handleCartToggle = () => {
        if (isInCart) {
            console.log(`Removing product ${product.id} from cart`);
            removeFromCart(product.id); 
        } else {
            console.log(`Adding product ${product.id} to cart`);
            addToCart(user?.id, product.id); 
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-3">
            <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
                <i className="fa-solid fa-backward"></i> Back
            </button>
            <div className='row' style={{marginTop: "40px", marginBottom: "150px"}}>
                <div className="col-md-4 mb-4">
                    <img src={product.imageUrl} alt={product.listItem} className="img-fluid" />
                </div>
                
                <div className="col-md-4 mb-4">
                    <h3>{product.listItem}</h3>
                    <br />
                    <h4>₹{product.price.new}</h4>
                    {product.price.old && <h6 className="text-muted text-decoration-line-through">₹{product.price.old}</h6>}
                    <br />
                    <p>Rating: {product.rating}</p>
                    <p>Description: {product.description}</p>
                    <p>Category: {product.category}</p>
                    <p>Discount: {product.discount ? "Yes" : "No"}</p>
                    <button 
                        className='btn btn-primary' 
                        style={{ marginLeft: "40%" }}
                        onClick={handleCartToggle}
                    >
                        {isInCart ? "Remove from Cart" : "Add to Cart"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductView;
