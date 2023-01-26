import React from 'react';

const FormRequestSuccess = ({ product, user }) => {
  return (
    <div
      className="flex h-full  flex-col items-center justify-center font-sans text-3xl text-orange-200 shadow-sm shadow-orange-400"
      style={{ backgroundColor: '#231f20' }}
    >
      <div>
        we sent your request to seller&nbsp;
        <span className="font-black text-orange-900">
          {product.seller_name}&nbsp;
        </span>
        concerning their product&nbsp;
        <span className="font-black text-orange-900">{product.title}</span>
      </div>
      <p className="text-md font-cairo font-extralight opacity-80">
        watch your email <span className="text-white">{user.email}</span> to
        hear from them!
      </p>
      ✅
    </div>
  );
};

export default FormRequestSuccess;
