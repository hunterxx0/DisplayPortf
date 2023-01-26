import { faTag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InfoIcon from '@mui/icons-material/Info';
import { Tooltip } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const RequestCard = ({ product, requests }) => {
  return requests.map((request, idx) => (
    <div className="flex flex-col" key={request.id}>
      <div className="px-2 pb-4 text-center font-sans text-orange-200 shadow-sm shadow-black">
        <div className="flex w-full items-center justify-end py-1 text-sm text-orange-200">
          <button className="transition hover:text-orange-600">
            <Link
              to={`/requests/${product.title.split(' ').join('-')}/${
                request.id
              }`}
              state={{ product, request }}
            >
              <Tooltip title="Request detail">
                <InfoIcon className="rounded-full" fontSize="small" />
              </Tooltip>
            </Link>
          </button>
        </div>
        <div>
          <img src={product?.pics_url[0]} alt="" />
        </div>
        <div className="">
          <div className="flex items-center justify-between px-1 pt-1 text-sm font-extralight italic">
            <Link
              className="transition hover:text-orange-600"
              to={`/products/${product._id}`}
            >
              <p className="lowercase ">{product.title}</p>
            </Link>
            <Link
              className="transition hover:text-orange-600"
              to={`/seller/${product.seller_name}`}
            >
              <p>{product.seller_name}</p>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center pt-4">
            {product.tags.map((tag, idx) => (
              <div
                className="flex items-center gap-1 rounded-full border-x-4 px-2 py-1"
                key={idx}
              >
                <FontAwesomeIcon className="text-white" icon={faTag} />
                <p className=" whitespace-nowrap font-cairo text-sm font-extralight italic opacity-80">
                  {tag}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="py-2 text-center font-sans text-xs  text-orange-200 opacity-90">
        {request?.data?.date_time}
      </div>
    </div>
  ));
};

export default RequestCard;
