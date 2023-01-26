import axios from 'axios';
import { API_ENDPOINTS } from '../Utils/constants';

const getSellersByCategory = async (categoryname) => {
  const response = await axios.get(
    `${
      API_ENDPOINTS.products
    }/sellers/category/${categoryname[0].toUpperCase()}${categoryname
      .slice(1)
      .toLocaleLowerCase()}`
  );
  return response.data;
};

export default getSellersByCategory;
