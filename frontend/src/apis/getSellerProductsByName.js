import axios from 'axios';
import { API_ENDPOINTS } from '../Utils/constants';

const getSellerProductsByName = async (sellerName) => {
  const res = await axios.get(`${API_ENDPOINTS.products}/seller/${sellerName}`);
  return res.data;
};

export default getSellerProductsByName;
