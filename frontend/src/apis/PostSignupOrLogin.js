import axios from 'axios';
import { API_ENDPOINTS } from '../Utils/constants';

const PostSignupOrLogin = async (form, mode) => {
  const {
    username,
    password,
    phoneNumber,
    avatarURL,
    email,
    fullName,
    website,
    country: seller_country,
  } = form;

  const role = mode === 'signupSeller' ? 'seller' : 'user';
  const res = await axios.post(`${API_ENDPOINTS.auth}/${mode}`, {
    username,
    password,
    phoneNumber,
    avatarURL,
    email,
    fullName,
    website,
    seller_country,
    role,
  });
  return res.data;
};

export default PostSignupOrLogin;
