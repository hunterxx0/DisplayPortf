import axios from 'axios';
import { API_ENDPOINTS } from '../Utils/constants';

export const setNotificationToRead = async (uid, nid, role = 'user') => {
  let response = null;

  response = await axios.patch(
    `${
      role === 'user' ? API_ENDPOINTS.users : API_ENDPOINTS.sellers
    }/${uid}/notifications/${nid}`
  );

  return response.data;
};
