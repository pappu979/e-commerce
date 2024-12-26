// Total Amount
export const calculateTotalAmount = (items) => {
  return items.reduce(
    (total, item) => total + item?.price * item?.productQuantity,
    0
  );
};

// TotalDiscountAmount....
export const totalDiscountAmount = (cartItems) => {
  return cartItems.reduce(
    (total, item) =>
      total +
      (item?.price * item?.discountPercentage * item?.productQuantity) / 100,
    0
  );
};

// Check platformFee..
export const checkPlatformFee = (price) => {
  let TotalplatformFee = 5;
  if (price < 100) {
    return (TotalplatformFee = 0);
  } else if (price > 100 && price < 500) {
    return (TotalplatformFee = 3);
  } else {
    return (TotalplatformFee = 5);
  }
};

// Time formating..
export const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

// Total savinng Amount when select CachOnDelivery...

export const totalSavingAmountCashOnDelivery = (
  selectedOption,
  savIngPrice,
  platformFee
) => {
  const totalSavingAmount =
    selectedOption === "CashOnDelivery"
      ? savIngPrice - 7 - platformFee
      : savIngPrice - platformFee;

  return totalSavingAmount;
};

// Total payable Amount when select CachOnDelivery...

export const totalPayableAmountCashOnDelivery = (
  selectedOption,
  product,
  platformFee,
  productQuantity
) => {
  const payAbleAmount =
    selectedOption === "CashOnDelivery"
      ? product.price * productQuantity + 7 + platformFee
      : product.price * productQuantity + platformFee;

  return payAbleAmount;
};

export const chunkProducts = (products, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < products.length; i += chunkSize) {
    chunks.push(products.slice(i, i + chunkSize));
  }
  return chunks;
};

export function capitalizeSegments(input) {
  return input
    .split(/[-,\s]/)
    .map((str) => str[0].toUpperCase() + str.slice(1))
    .join("-");
}
