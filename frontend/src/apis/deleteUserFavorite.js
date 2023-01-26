import axios from 'axios';
import { API_ENDPOINTS } from '../Utils/constants';

const deleteUserFavorite = async (productId, username) => {
  const response = await axios.delete(
    `${API_ENDPOINTS.users}/${username}/favorites/${productId}`
  );
  return response.data;
};

export default deleteUserFavorite;
