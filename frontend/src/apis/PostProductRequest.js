import axios from 'axios';
import { API_ENDPOINTS } from '../Utils/constants';

export const PostProductRequest = async (productId, data, uid) => {
  axios.patch(`${API_ENDPOINTS.products}/${productId}/requests/`, {
    user_id: uid,
    data,
  });
};
