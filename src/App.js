// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import StockManagement from './components/Admin/StockManagement';
import BulkProductCsv from './components/Admin/BulkProductCsv';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import ProductView from './components/ProductView';
import NotFound from './components/NotFound';
import Nav from './components/Nav';
import Cart from './components/Cart';
import Register from './components/Register';
import Login from './components/Login';
import UserInfo from './components/UserInfo';
import UserEdit from './components/UserEdit';
import Wishlist from './components/Wishlist';
import { addToWishlist,removeFromWishlist } from './components/WishList/WishListServices';
import AdminPanel from './components/Admin/AdminPanel';
import SalesReport from './components/SalesReports/SalesReport';
import Footer from './components/Footer';
import Header from './components/Header';
import { getProducts,getCategories } from './components/ProductService';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import './App.css';

const App = () => {
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [userDetails, setUserDetails] = useState(null);
    const [categories, setCategories] = useState([]); 


   
    const [currentCoupon, setCurrentCoupon] = useState(null);
    const [discountAmount, setDiscountAmount] = useState(0);

 
    const [currentMinVal, setCurrentMinVal] = useState(0);
    const [currentMaxVal, setCurrentMaxVal] = useState(100000);
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [selectedCategory, setSelectedCategory] = useState('');

   
    const [currentMinRating, setCurrentMinRating] = useState(0);
const [currentMaxRating, setCurrentMaxRating] = useState(5);



    
    useEffect(() => {
        const fetchUserDetails = async () => {
            if (user) {
                try {
                    const response = await fetch(`https://localhost:7251/api/UsersApi/${user.id}`);
                    if (!response.ok) throw new Error('Failed to fetch user details');
                    const data = await response.json();
                    setUserDetails(data);
                } catch (error) {
                    console.error('Error fetching user details:', error);
                }
            }
        };

        fetchUserDetails();
    }, [user]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const addToCart = async (userId, productId) => {
        const existingProduct = cart.find(item => item.productId === productId);
    
        if (existingProduct) {
          
            setCart(prevCart => prevCart.filter(item => item.productId !== productId));
            console.log('Existing product:', existingProduct);
            
         
            try {
                await removeFromCart(existingProduct.id); 
            } catch (error) {
                console.error('Failed to remove item from cart:', error);
            }
        } else {
            
            try {
                const newItem = await addToCart(userId, productId); 
                setCart(prevCart => {
                    const updatedCart = [...prevCart, newItem];
                    console.log('Added product to cart:', newItem);
                    return updatedCart;
                });
            } catch (error) {
                console.error('Failed to add item to cart:', error);
            }
        }
    };
    
    
   
    const removeFromCart = async (cartItemId) => {
        const response = await fetch(`https://localhost:7251/api/CartItem/${cartItemId}`, {
            method: 'DELETE',
        });
    
        if (!response.ok) {
            throw new Error('Failed to remove item from cart');
        }
    };
   
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productData = await getProducts();
                setProducts(productData);

              
                const uniqueCategories = [...new Set(productData.map(product => product.category.trim()))];
                setCategories(uniqueCategories);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);
    
    


    const ProtectedRoute = ({ element }) => {
        return user ? element : <Navigate to="/login" />;
    };
   
    

const updateWishlist = async () => {
    const updatedWishlist = await fetchWishlist(userId); 
    setWishlist(updatedWishlist);
};


const handleWishlistToggle = async (product) => {
    try {
        if (isProductInWishlist(product.id)) {
            await removeFromWishlist(product.id);
        } else {
            await addToWishlist(userId, product.id);
        }
        await updateWishlist(); 
    } catch (error) {
        console.error('Wishlist toggle failed:', error);
    }
};

    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
                setFilteredProducts(data); 
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);
 
    

    const applyFilters = () => {
        console.log("Applying filters...");
        console.log("Min Rating:", currentMinRating, "Max Rating:", currentMaxRating);
        
        let newFilteredProducts = products.filter(product => {
            const withinPriceRange = product.price.new >= currentMinVal && product.price.new <= currentMaxVal;
            const withinRatingRange = product.rating >= currentMinRating && product.rating <= currentMaxRating;
    
            console.log(`Product ID: ${product.id}, Price: ${product.price.new}, Rating: ${product.rating}`);
            return withinPriceRange && withinRatingRange;
        });
    
        if (selectedCategory) {
            newFilteredProducts = newFilteredProducts.filter(product => product.category === selectedCategory);
        }
    
        setFilteredProducts(newFilteredProducts);
        console.log("Filtered Products:", newFilteredProducts);
    };
    
    

    const cartCount = cart.length;

    const logout = () => {
        setUser(null);
    };

    const resetFilters = () => {
        setSearchTerm('');
        setSelectedCategory('');
        setCurrentMinVal(0);
        setCurrentMaxVal(100000);
        setCurrentMinRating(0);
         setCurrentMaxRating(5);
        setFilteredProducts(products); 
    };
   
    

    return (
        <Router>
            <Nav
                cartValue={cartCount}
                logout={logout}
                isLoggedIn={!!user}
                isAdmin={user?.isAdmin}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                categories={categories} 
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                resetFilters={resetFilters}

                currentMinVal={currentMinVal} 
                currentMaxVal={currentMaxVal} 
                setCurrentMinVal={setCurrentMinVal} 
                setCurrentMaxVal={setCurrentMaxVal} 
                applyFilters={applyFilters}
                currentMinRating={currentMinRating}
                currentMaxRating={currentMaxRating}
                setCurrentMinRating={setCurrentMinRating}
                setCurrentMaxRating={setCurrentMaxRating}
            />


            <div>
                <Routes>
                    <Route path="/" element={<ProductList addToCart={addToCart} cart={cart} isLoggedIn={!!user} isAdmin={user?.isAdmin} searchTerm={searchTerm} selectedCategory={selectedCategory} userId={user?.id}  wishlist={wishlist} addToWishlist={addToWishlist}  removeFromWishlist={removeFromWishlist} products={filteredProducts} currentMinVal={currentMinVal} currentMaxVal={currentMaxVal} currentMinRating={currentMinRating}  currentMaxRating={currentMaxRating}/>} />
                    <Route path="/products/new" element={<ProtectedRoute element={<ProductForm />} />} />
                    <Route path="/userinfo" element={<ProtectedRoute element={<UserInfo userId={user?.id} />} />} />
                    <Route path="/users/edit/:id" element={<ProtectedRoute element={<UserEdit />} />} />
                    <Route path="/products/edit/:id" element={<ProtectedRoute element={<ProductForm />} />} />
                    <Route
                        path="/products/:id"
                        element={user ? <ProductView addToCart={addToCart} user={user} cart={cart} /> : <Navigate to="/login" />}
                    />
                    {/* <Route path="/cart" element={<Cart cart={cart} />} /> */}
                    <Route path="/cart" element={<Cart userId={user?.id} userDetails={userDetails} discountAmount={discountAmount}/>} />
                    <Route path="/wishlist" element={<Wishlist userId={user?.id} wishlist={wishlist} removeFromWishlist={removeFromWishlist} />} />
                    <Route path="/adminpanel" element={<AdminPanel isAdmin={user?.isAdmin} />}/>
                    <Route path="sales-reports" element={<SalesReport />} />
                     <Route path="/csv" element={<BulkProductCsv/>}/>
                    <Route path="/stock-management" element={<ProtectedRoute element={<StockManagement />} />} />

                   
                    <Route path="/login" element={<Login onLogin={setUser} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
            <Footer />
        </Router>
    );
};

export default App;
