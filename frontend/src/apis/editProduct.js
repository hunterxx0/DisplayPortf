import axios from 'axios';
import { API_ENDPOINTS, headers } from '../Utils/constants';

export const editProduct = async (changedProduct, user, productId) => {
  const { title, pics_url, category, descriptions, tags, characteristics } =
    changedProduct;
  const response = await axios.patch(
    `${API_ENDPOINTS.products}/${productId}`,
    {
      title,
      pics_url,
      category,
      descriptions,
      tags,
      characteristics,
      seller_id: user?.me?.id,
    },
    headers
  );
  return response.data;
};
