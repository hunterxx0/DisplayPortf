import Cookie from 'universal-cookie';
const cookie = new Cookie();

const URL = 'https://displayapi.onrender.com';
export const API_ENDPOINTS = {
  auth: `${URL}/auth`,
  users: `${URL}/users`,
  products: `${URL}/products`,
  sellers: `${URL}/sellers`,
};

export const headers = {
  headers: {
    Authorization: `Bearer ${cookie.get('token')}`,
  },
};
