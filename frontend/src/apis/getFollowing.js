import axios from 'axios';
import { API_ENDPOINTS } from '../Utils/constants';

export const getFollowing = async (uid) => {
  const response = await axios.get(`${API_ENDPOINTS.users}/${uid}/following`);
  return response.data;
};
