import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

const Nav = ({
    cartValue,
    logout,
    isLoggedIn,
    isAdmin,
    searchTerm,
    setSearchTerm,
    resetFilters,
    state,
    onMinSliderChange,
    onMaxSliderChange,
    options,
    categories,
    selectedCategory,
    setSelectedCategory,
    currentMinVal,
    currentMaxVal,
    setCurrentMinVal,
    setCurrentMaxVal,
    currentMinRating,
    currentMaxRating,
    setCurrentMinRating,
    setCurrentMaxRating,
    applyFilters
}) => {
    const navigate = useNavigate();

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container px-4 px-lg-5">
                <Link className="navbar-brand" to="/">
                    Shop For Home <i className="fa-solid fa-shop"></i>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        {isLoggedIn && (
                            <Link className="nav-link" to="/wishlist">Wishlist</Link>
                        )}
                        {isAdmin && (
                            <>

                                <li className="nav-item">
                                    <Link className="nav-link" to="/adminpanel">Admin panel</Link>
                                </li>
                            </>
                        )}
                    </ul>


                    <form className="d-flex me-2" onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            className="form-control me-2"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </form>


                    <Dropdown>
                        <Dropdown.Toggle variant="secondary" id="categoryDropdown">
                            {selectedCategory ? selectedCategory : 'Category'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {categories.map((category) => (
                                <Dropdown.Item
                                    key={category}
                                    as="button"
                                    onClick={() => {
                                        setSelectedCategory(category);
                                        applyFilters();
                                    }}
                                >
                                    {category}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>




                    <Dropdown>
                        <Dropdown.Toggle variant="secondary" id="dropdownMenuButton">
                            Filter
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <div className="d-flex flex-column me-4">

                                <label style={{ textAlign: "center" }}><h5>Price</h5></label>
                                <label htmlFor="min">Min: ₹{currentMinVal}</label>
                                <input
                                    id="min"
                                    type="range"
                                    min="0"
                                    max="100000"
                                    value={currentMinVal}
                                    onChange={(e) => setCurrentMinVal(Number(e.target.value))}
                                />
                                <label htmlFor="max">Max: ₹{currentMaxVal}</label>
                                <input
                                    id="max"
                                    type="range"
                                    min="0"
                                    max="100000"
                                    value={currentMaxVal}
                                    onChange={(e) => setCurrentMaxVal(Number(e.target.value))}
                                />
                                <label style={{ textAlign: "center" }}><h5>Rating</h5></label>
                                <label htmlFor="minRating">Min Rating: {currentMinRating}</label>
                                <input
                                    id="minRating"
                                    type="range"
                                    min="0"
                                    max="5"
                                    value={currentMinRating}
                                    onChange={(e) => setCurrentMinRating(Number(e.target.value))}
                                />
                                <label htmlFor="maxRating">Max Rating: {currentMaxRating}</label>
                                <input
                                    id="maxRating"
                                    type="range"
                                    min="0"
                                    max="5"
                                    value={currentMaxRating}
                                    onChange={(e) => setCurrentMaxRating(Number(e.target.value))}
                                />
                            </div>
                            <Dropdown.Item as="button" onClick={applyFilters}>
                                Apply Filter
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>


                    {/* Reset Button */}
                    <button className="btn btn-outline-secondary me-4" onClick={resetFilters}>
                        Reset Filters
                    </button>

                    <div className="d-flex align-items-center">
                        {isLoggedIn ? (
                            <button onClick={logout} className="btn btn-outline-danger">Logout</button>
                        ) : (
                            <>
                                <Link className="btn btn-outline-primary me-2" to="/login">Login</Link>
                                <Link className="btn btn-outline-success" to="/register">Register</Link>
                            </>
                        )}
                        {isLoggedIn && (
                            <Link className="btn btn-outline-dark" to="/cart">
                                Cart <span className="badge bg-dark text-white ms-1 rounded-pill">{cartValue}</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Nav;
