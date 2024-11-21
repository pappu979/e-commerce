
 // CalculateTotal...
 export const calculateTotal = (cartItems) => {
    return cartItems.reduce(
        (total, item) => total + item.price * item.productQuantity,
        0
    );
};

// TotalDiscountAmount....
export const totalDiscountAmount = (cartItems) => {
    return cartItems.reduce(
        (total, item) => total + (item.price * item.discountPercentage * item.productQuantity) / 100,
        0
    );
}

// Check platformFee..
export const checkPlatformFee = (updateCalc) => {
    let platformFee = 10;
    if (updateCalc < 100) {
        platformFee = 0;
    } else if (updateCalc > 100 && updateCalc < 500) {
        platformFee = 5;
    } else {
       platformFee = 10;
    }
    return platformFee;
}