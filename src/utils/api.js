import axios from "axios";

// Fetch all categories
export const fetchCategories = async () => {
  const { data } = await axios.get("https://dummyjson.com/products/categories");
  return data;
};

// Fetch products by category
export const fetchProductsByCategory = async (category) => {
  const { data } = await axios.get(`https://dummyjson.com/products/category/${category}`);
  return data.products;
};