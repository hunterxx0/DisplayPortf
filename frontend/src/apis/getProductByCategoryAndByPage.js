import axios from 'axios';
import { API_ENDPOINTS } from '../Utils/constants';

const getProductByCategoryAndByPage = async (search, categoryOption, page) => {
  const res = await axios.get(
    `${API_ENDPOINTS.products}/title/${search}/category/${categoryOption}?page=${page}`
  );
  return res;
};

export default getProductByCategoryAndByPage;
