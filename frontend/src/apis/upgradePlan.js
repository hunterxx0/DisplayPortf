import axios from 'axios';
import { API_ENDPOINTS, headers } from '../Utils/constants';

export const upgradePlan = async (sellerName, plan) => {
  const { data } = await axios.patch(
    `${API_ENDPOINTS.sellers}/${sellerName}/upgrade/${plan}`,
    {},
    headers
  );
  return data;
};
