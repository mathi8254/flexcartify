// CouponInput.js
import React, { useState } from 'react';

const CouponInput = ({ setDiscountAmount }) => {
    const [code, setCode] = useState('');

    const applyCoupon = async () => {
        
        const validCoupons = {
            SAVE10: 1000,
            SAVE20: 2000,
        };

        if (validCoupons[code]) {
            setDiscountAmount(validCoupons[code]);
            alert(`Coupon applied! You get a ${validCoupons[code]}₹ discount.`);
        } else {
            alert('Invalid coupon code.');
        }
    };

    return (
        <div>
            <input 
                type="text" 
                value={code} 
                onChange={(e) => setCode(e.target.value)} 
                placeholder="Enter coupon code" 
            />
            <button onClick={applyCoupon}>Apply</button>
        </div>
    );
};

export default CouponInput;
