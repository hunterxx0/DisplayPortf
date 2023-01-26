import axios from 'axios';
import { API_ENDPOINTS } from '../Utils/constants';

export const addProductToUserFavorites = async (uid, pid) => {
  axios.patch(`${API_ENDPOINTS.users}/${uid}/favorites/${pid}`);
};
