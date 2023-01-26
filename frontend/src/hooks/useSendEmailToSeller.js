import { useEffect } from 'react';
import { PostProductRequest } from '../apis/PostProductRequest';
import sendEmailToUser from '../apis/sendEmailToUser';

export const useSendEmailToSeller = async (
  isSent,
  template_params,
  productId,
  uid
) => {
  useEffect(() => {
    if (isSent)
      sendEmailToUser({
        service_id: process.env.REACT_APP_EMAILJS_SERVICE_ID,
        template_id: process.env.REACT_APP_EMAILJS_TEMPLATE_ID_SELLER,
        user_id: process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
        template_params,
      }).then(() => PostProductRequest(productId, template_params, uid));
  }, [isSent, template_params, productId, uid]);
};
