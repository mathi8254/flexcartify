import axios from 'axios';

const API_URL = 'https://localhost:7251/api/Productsap'; 

export const getProducts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getProduct = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const createProduct = async (product) => {
    const response = await axios.post(API_URL, product);
    return response.data;
};

export const updateProduct = async (id, product) => {
    const response = await axios.put(`${API_URL}/${id}`, product);
    return response.data;
};

export const deleteProduct = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};
export const getCategories = async () => {
    const response = await fetch('https://localhost:7251/api/CategoriesApi');
    if (!response.ok) {
        throw new Error('Failed to fetch categories');
    }
    return await response.json();
};


export const addToCart = async (userId, productId) => {
    const response = await fetch(`https://localhost:7251/api/CartItem`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: 0,
            userId: userId,
            productId: productId,
            quantity: 1,
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to add item to cart');
    }

    return await response.json();
};

