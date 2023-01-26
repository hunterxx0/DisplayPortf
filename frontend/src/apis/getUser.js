import axios from 'axios';
import { API_ENDPOINTS } from '../Utils/constants';

const getUser = async (uid) => {
  if (uid) {
    const res = await axios.get(`${API_ENDPOINTS.users}/${uid}`);
    return res.data;
  }
};

export default getUser;
