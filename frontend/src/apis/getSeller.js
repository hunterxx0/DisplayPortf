import axios from 'axios';
import { API_ENDPOINTS } from '../Utils/constants';

export const getSeller = async (sellername) => {
  const res = await axios.get(`${API_ENDPOINTS.sellers}/name/${sellername}`);
  return res.data;
};
