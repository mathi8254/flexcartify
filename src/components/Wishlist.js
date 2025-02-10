import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Wishlist = ({ userId, wishlist, removeFromWishlist }) => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            if (!userId) return;

            try {
               
                const response = await fetch(`https://localhost:7251/api/WishList/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch wishlist items');
                }
                const wishlistItems = await response.json();
                console.log('Fetched wishlist items:', wishlistItems);

               
                const wishlistProductIds = wishlistItems.map(item => item.productId);
                console.log('Wishlist Product IDs:', wishlistProductIds);

                
                const productsResponse = await fetch('https://localhost:7251/api/Productsap'); 
                if (!productsResponse.ok) {
                    throw new Error('Failed to fetch products');
                }
                const productsData = await productsResponse.json();
                console.log('Fetched products:', productsData);

                
                const wishlistProducts = productsData.filter(product => 
                    wishlistProductIds.includes(product.id) 
                );

                console.log('Filtered wishlist products:', wishlistProducts);
                setProducts(wishlistProducts);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchProducts();
    }, [userId, wishlist]);

    const handleRemoveFromWishlist = async (productId) => {
        console.log('User ID:', userId);
        console.log('Product ID:', productId);
        
        try {
            await removeFromWishlist(userId, productId);
            setProducts(prev => prev.filter(item => item.id !== productId)); 
        } catch (error) {
            console.error('Error removing from wishlist:', error);
        }
    };

 
    useEffect(() => {
        console.log('Products to render:', products);
    }, [products]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container mt-3">
            <h1>Your Wishlist</h1>
            {products.length === 0 ? (
                <p>No items in your wishlist.</p>
            ) : (
                <div className="row">
                    {products.map(item => (
                        <div className="col-md-4 mb-4" key={item.id}>
                            <div className="card h-100">
                                <Link to={`/products/${item.productId}`} className="text-decoration-none text-dark">
                                    <img className="card-img-top" src={item.imageUrl} alt={item.name} />
                                    <div className="card-body text-center">
                                        <h5 className="fw-bolder">{item.listItem}</h5>
                                        <div>
                                            Price: ₹{item.price.new}
                                            {item.price.old && <span className="text-muted text-decoration-line-through"> (₹{item.price.old})</span>}
                                        </div>
                                    </div>
                                </Link>
                                <div className="card-footer bg-transparent border-top-0">
                                    <button
                                        className="btn btn-danger w-100"
                                        onClick={() => handleRemoveFromWishlist(item.id)}
                                    >
                                        Remove from Wishlist
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
