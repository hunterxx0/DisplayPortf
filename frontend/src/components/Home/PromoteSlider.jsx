import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React, { useState } from 'react';
const PromoteSlider = () => {
  const [currIdx, setCurrIdx] = useState(0);

  const handleSlide = (dir) => {
    if (dir === 'left') setCurrIdx(currIdx > 0 ? currIdx - 1 : 2);
    if (dir === 'right') setCurrIdx(currIdx < 2 ? currIdx + 1 : 0);
  };

  return (
    <div
      className={`relative flex w-screen overflow-x-hidden`}
      style={{ transform: `translateX(${-100 * currIdx}vw)` }}
    >
      <img
        className="h-auto w-full"
        src=" https://i.ebayimg.com/images/g/VxUAAOSw25ti9hux/s-l1600.webp"
        alt=""
      />
      <img
        className="h-auto w-full"
        src="https://i.ebayimg.com/images/g/dywAAOSwMzFjBjQ1/s-l960.webp"
        alt=""
      />
      <div className="">
        <ArrowBackIosNewIcon
          fontSize="large"
          className="absolute left-0 top-1/2 m-auto cursor-pointer hover:opacity-80"
          onClick={() => {
            handleSlide('left');
          }}
        />
        <ArrowForwardIosIcon
          fontSize="large"
          className="absolute right-0 top-1/2 m-auto cursor-pointer hover:opacity-80"
          onClick={() => {
            handleSlide('right');
          }}
        />
      </div>
    </div>
  );
};

export default PromoteSlider;
