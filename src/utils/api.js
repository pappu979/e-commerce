import axios from "axios";

export const fetchCategories = async () => {
  const { data } = await axios.get("https://dummyjson.com/products/categories");
  return data;
};

export const fetchProductsByCategory = async (category) => {
  const { data } = await axios.get(
    `https://dummyjson.com/products/category/${category}`
  );
  return data.products;
};

export const fetchProducts = async () => {
  const { data } = await axios.get("https://dummyjson.com/products");
  return data.products;
};

export const categorizeProducts = (products) => {
  return products?.reduce((acc, product) => {
    acc[product.category] = acc[product.category] || [];
    acc[product.category].push(product);
    return acc;
  }, {});
};
