import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import React, { useState } from 'react';

const DescriptionFormatted = ({ description }) => {
  const [show, setShow] = useState(false);
  const first = description.split(' ').slice(0, 10);
  const rest = description.split(' ').slice(10);
  return (
    <>
      {first.join(' ')}
      <button
        className={`${show ? 'hidden' : 'block'} mx-auto px-2  py-1 `}
        onClick={() => setShow((prev) => !prev)}
      >
        &nbsp;...
        <KeyboardArrowDownIcon />
      </button>
      {show && (
        <>
          {rest.join(' ')}
          <button
            className={`${!show ? 'hidden' : 'block'}  mx-auto px-2 py-1`}
            onClick={() => setShow((prev) => !prev)}
          >
            <KeyboardArrowUpIcon />
          </button>
        </>
      )}
    </>
  );
};

export default DescriptionFormatted;
