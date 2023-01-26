import axios from 'axios';
import { API_ENDPOINTS } from '../Utils/constants';

export const deleteUser = async (uid) => {
  const response = await axios.delete(`${API_ENDPOINTS.auth}/eraseUser/${uid}`);
  return response.data;
};
