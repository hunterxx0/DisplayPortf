import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_ENDPOINTS } from '../../Utils/constants';
import LoadingSpinner from '../../Utils/LoadingSpinner';
import ModalOverlay from '../../Utils/ModalOverlay';

const getSellers = async () => {
  const response = await axios.get(`${API_ENDPOINTS.sellers}`);
  return response.data;
};

const useGetSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getSellers()
      .then((sellers) => setSellers(sellers))
      .catch((err) => {
        setError(err);
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);
  return { sellers, isLoading, isError, error };
};

const HomeBrandSection = () => {
  const { sellers, isLoading, isError, error } = useGetSellers();

  if (isLoading)
    return (
      <ModalOverlay>
        <LoadingSpinner />
      </ModalOverlay>
    );
  if (isError) return <div>{error.message}</div>;

  return (
    <motion.div
      className="hidden w-full max-w-7xl flex-wrap rounded-lg  bg-transparent md:flex-row lg:block "
      initial={{ opacity: 0, x: -800 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <div className="flex justify-center gap-x-10 px-16">
        {sellers.slice(15, 20).map((seller) => (
          <Link
            className="flex  flex-col items-center rounded-full pb-4 shadow-md shadow-orange-200"
            to={`/seller/${seller.name}`}
            key={seller.name}
          >
            <div className="max-w-80 peer max-h-80">
              <img
                className="h-40 w-40 cursor-pointer rounded-full object-cover outline outline-orange-100 duration-150 
                 hover:scale-110 hover:outline-orange-300 "
                src={seller.avatarURL}
                alt=""
              />
            </div>
            <span
              href="/"
              className="p-2 font-sans text-xl text-orange-100 transition hover:text-orange-300 peer-hover:text-orange-300"
            >
              {seller.name}
            </span>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default HomeBrandSection;
