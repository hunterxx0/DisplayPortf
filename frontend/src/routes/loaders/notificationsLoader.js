import axios from 'axios';
import { API_ENDPOINTS } from '../../Utils/constants';

export const notificationsLoader = async ({ params: { id } }) => {
  const endpoints = [
    `${API_ENDPOINTS.users}/${id}`,
    `${API_ENDPOINTS.sellers}/name/${id}`,
  ];
  const response = await Promise.any(
    endpoints.map((endpoint) => axios.get(endpoint))
  );

  // if the seller is loggedin then I don't want him to be able to see the user's [whom is associcated with the id] notifciations
  // vice verca

  return response.data;
};

// header token could be the solution
