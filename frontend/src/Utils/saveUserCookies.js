import Cookies from 'universal-cookie';

const saveUserCookies = ({ token, userId, username, avatarURL }) => {
  const cookies = new Cookies();

  cookies.set('token', token);
  cookies.set('username', username);
  cookies.set('userId', userId);
  cookies.set('avatarURL', avatarURL);
};

export default saveUserCookies;
