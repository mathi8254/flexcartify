
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct, addToCart } from '../components/ProductService';
import { addToWishlist,removeFromWishlist } from './WishList/WishListServices';
import Header from './Header';
import './ProductList.css';

const ProductList = ({ userId, cart, isLoggedIn, isAdmin, searchTerm, selectedCategory, wishlist, addToWishlist, removeFromWishlist,  currentMinVal,  currentMaxVal,currentMinRating,currentMaxRating }) => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (err) {
            setError('Failed to fetch products');
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteProduct(id);
            loadProducts();
        } catch (err) {
            console.error('Failed to delete product', err);
        }
    };

  
    const handleAddToCart = async (product) => {
        if (!userId) {
            alert('Please log in to add items to the cart.');
            return;
        }

        try {

            await addToCart(userId, product.id); 

            console.log('Current cart:', cart);
        } catch (error) {
            console.error('Failed to add to cart:', error);
        }
    };

    const isProductInCart = (userId, productId) => {
        return cart.some(item => item.productId === productId);
    };

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.listItem.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory ? product.category.toLowerCase() === selectedCategory.toLowerCase() : true;
        const matchesPrice = product.price.new >= currentMinVal && product.price.new <= currentMaxVal; 
        const matchesRating = product.rating >= currentMinRating && product.rating <= currentMaxRating; 

        return matchesSearch && matchesCategory && matchesPrice&& matchesRating;;
    });
    

    if (error) {
        return <div>{error}</div>;
    }

   

    const isProductInWishlist = (productId) => {
        return wishlist.some(item => item.productId === productId);
    };

    const handleWishlistToggle = async (product) => {
        if (!userId) {
            alert('Please log in to add items to your wishlist.'); 
            return;
        }
       
        try {
            if (isProductInWishlist(product.id)) {
                await removeFromWishlist(product.id); 
              
            } else {
                await addToWishlist(userId, product.id); 
                
                wishlist.push({ productId: product.id, productName: product.listItem }); 
            }
        } catch (error) {
            console.error('Wishlist toggle failed:', error);
        }
    };
    return (
        <div className='container mt-3'>
            <Header />
            {isAdmin && (
                <Link to="/products/new" className="btn btn-primary mb-3">Create New Product</Link>
            )}
            <div className="row">
                {filteredProducts.map(product => (
                    <div className="col-md-4 mb-4" key={product.id}>
                        <div className="card h-100">
                            <Link to={`/products/${product.id}`} className="text-decoration-none text-dark">
                                <img className="card-img-top" src={product.imageUrl} alt={product.listItem}  />
                                
                                <div className="card-body p-4 text-center">
                                    <h5 className="fw-bolder">{product.listItem}</h5>
                                    <span className={product.discount ? "text-muted text-decoration-line-through" : ""}>
                                        ₹{product.price.old}
                                    </span>
                                    {' '}₹{product.price.new}
                                    <div className="mt-2">
                                        {product.quantity === 0 ? (
                                            <span className="text-danger">Out of Stock</span>
                                        ) : product.quantity < 10 ? (
                                            <span className="text-warning">Only {product.quantity} left</span>
                                        ) : (
                                            <span className="text-success">In Stock</span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div className="text-center">
                                    <button
                                        className="btn btn-outline-dark mt-auto"
                                        onClick={() => {
                                            console.log(`Button clicked for product ID: ${product.id}`);
                                            handleAddToCart(product);
                                        }
                                        }
                                    >
                                        {isProductInCart(product.id) ? "Remove from Cart" : "Add to Cart"}

                                    </button>
                                    &nbsp;
                                    &nbsp;
                                    <button
                                        className="btn btn-outline-dark mt-auto"
                                        onClick={() => handleWishlistToggle(product)}
                                    >
                                        {isProductInWishlist(product.id) ? <i class="fa-solid fa-heart"style={{color:"f94848"}}></i> : <i class="fa-regular fa-heart"></i>}
                                    </button>

                                  
                                    {isAdmin && (
                                        <>
                                            <Link to={`/products/edit/${product.id}`} className="btn btn-secondary ms-2">
                                                Edit
                                            </Link>
                                            <button onClick={() => handleDelete(product.id)} className="btn btn-danger ms-2">
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;


