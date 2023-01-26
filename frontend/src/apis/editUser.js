import axios from 'axios';
import { API_ENDPOINTS, headers } from '../Utils/constants';

export const editUser = async (changes, uid) => {
  const response = await axios.patch(
    `${API_ENDPOINTS.users}/${uid}`,
    changes,
    headers
  );
  return response.data;
};
