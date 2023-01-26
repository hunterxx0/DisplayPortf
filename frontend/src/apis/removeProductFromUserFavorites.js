import axios from 'axios';
import { API_ENDPOINTS } from '../Utils/constants';

export const removeProductFromUserFavorites = async (uid, pid) => {
  axios.delete(`${API_ENDPOINTS.users}/${uid}/favorites/${pid}`);
};
