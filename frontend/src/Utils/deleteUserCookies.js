import Cookies from 'universal-cookie';

export const deleteUserCookies = () => {
  const cookies = new Cookies();

  cookies.remove('userId');
  cookies.remove('username');
  cookies.remove('avatarURL');
  cookies.remove('token');
};
