import axios from 'axios';

export const getItemsByPage = async (url) => {
  try {
    const { data } = await axios.get(url, { params: { sort: 'createdAt' } });
    return data;
  } catch (err) {
    throw err;
  }
};
