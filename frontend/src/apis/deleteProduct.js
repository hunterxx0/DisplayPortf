import axios from 'axios';
import { API_ENDPOINTS, headers } from '../Utils/constants';

export const deleteProduct = async (productId) => {
  await axios.delete(`${API_ENDPOINTS.products}/${productId}`, headers);
};
