import React from 'react';
import logo from './../assets/logo.svg';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <img
        className="h-8 w-8 animate-spin sm:h-14 sm:w-14"
        src={logo}
        alt="logo"
      />
      <span
        className="mx-0 my-2 animate-pulse fill-transparent  stroke-white stroke-2 font-sans text-xs uppercase tracking-widest text-orange-200 
        shadow-amber-300 drop-shadow-md sm:text-sm"
      >
        Display
      </span>
    </div>
  );
};

export default LoadingSpinner;
