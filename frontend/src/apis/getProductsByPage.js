import axios from 'axios';
import { API_ENDPOINTS } from '../Utils/constants';

const getProductsByPage = async (page, params) => {
  console.log(page);
  const res = await axios.get(
    `${API_ENDPOINTS.products}/page/${page.current}`,
    {
      params,
    }
  );
  return res.data;
};

export default getProductsByPage;
