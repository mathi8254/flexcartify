
export const addToWishlist = async (userId, productId) => {
    const response = await fetch(`https://localhost:7251/api/Wishlist`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, productId }),
    });

    if (!response.ok) {
        throw new Error('Failed to add to wishlist');
    }

    return await response.json();
};

export const removeFromWishlist = async (userId, productId) => {
    const response = await fetch(`https://localhost:7251/api/WishList/${userId}/${productId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        const errorText = await response.text(); 
        throw new Error(`Failed to remove from wishlist: ${errorText}`);
    }
};