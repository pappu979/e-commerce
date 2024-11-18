
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