// SearchResults.js
import React from 'react';

const SearchResults = ({ products, searchTerm }) => {
    const filteredProducts = products.filter(product =>
        product.listItem.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='container mt-3'>
            <h1>Search Results</h1>
            {filteredProducts.length === 0 ? (
                <p>No products found for "{searchTerm}"</p>
            ) : (
                <div className="row">
                    {filteredProducts.map(product => (
                        <div className="col-md-4 mb-4" key={product.id}>
                           
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchResults;
