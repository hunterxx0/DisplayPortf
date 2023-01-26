import axios from 'axios';

const sendEmailToUser = async (data) => {
  const res = await axios.post(
    `https://api.emailjs.com/api/v1.0/email/send`,
    data
  );

  return res;
};

export default sendEmailToUser;
