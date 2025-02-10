// CouponService.js
export const getCoupons = async () => {
    
    return [
        { id: 1, code: 'SAVE10', discount: 10 },
        { id: 2, code: 'SAVE20', discount: 20 },
        {id: 3, code: 'SAVE30', discount: 30 },
    ];
};

export const validateCoupon = async (code) => {
    const coupons = await getCoupons();
    return coupons.find(coupon => coupon.code === code);
};
