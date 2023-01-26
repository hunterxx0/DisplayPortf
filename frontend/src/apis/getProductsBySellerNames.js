import axios from 'axios';
import { API_ENDPOINTS } from '../Utils/constants';

const getProductsBySellerNames = async (selectedSellers, category) => {
  const endpoints = selectedSellers.map(
    (sellerName) =>
      `${API_ENDPOINTS.products}/seller/${sellerName}/category/${category}`
  );
  const response = await Promise.all(
    endpoints.map((endpoint) => axios.get(endpoint))
  );
  let products = [];

  response.forEach((res) => {
    const sellerProducts = res.data;
    products = [...products, ...sellerProducts];
  });
  return products;
};

export default getProductsBySellerNames;
