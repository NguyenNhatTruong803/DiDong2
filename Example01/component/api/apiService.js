// apiService.js
const BASE_URL = 'https://fakestoreapi.com';

export const getProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products/categories`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getProductsByCategory = async (category) => {
  try {
    const response = await fetch(`${BASE_URL}/products/category/${category}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
