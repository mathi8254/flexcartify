// CartService.js

export const updateCart = async (cartItem) => {
    const response = await fetch(`/api/cart/${cartItem.userId}/${cartItem.productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartItem),
    });
    return await response.json();
};

export const removeFromCart = async (userId, productId) => {
    await fetch(`/api/cart/${userId}/${productId}`, {
        method: 'DELETE',
    });
};
