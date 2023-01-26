import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookie from 'universal-cookie';
import { useAuth } from '../../../contexts/user-context';
import { API_ENDPOINTS, headers } from '../../../Utils/constants';
import BasicInfo from './BasicInfo';
import Characteristics from './Characteristics';
import Description from './Description';
const cookie = new Cookie();

const AddProduct = ({ addingProduct, setIsAddingProduct }) => {
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { user } = useAuth();
  const [product, setProduct] = useState({
    title: '',
    pics_url: [],
    category: '',
    descriptions: '',
    tags: [],
    characteristics: {},
    seller_name: user?.me?.name,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAddingProduct(false);

    axios
      .post(
        API_ENDPOINTS.products,
        {
          ...product,
          seller_id: user?.me?.id,
        },
        headers
      )
      .then(() => {
        navigate('/');
        enqueueSnackbar('Product Successfully added!', {
          action: (snackbarId) => (
            <div>
              <button
                onClick={() => {
                  closeSnackbar(snackbarId);
                }}
              >
                Dismiss
              </button>
            </div>
          ),
        });
      });
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div>
        <h1
          className="bg-gradient-to-br from-orange-700 to-white bg-clip-text py-2 font-cairo text-2xl font-black uppercase 
                       text-transparent transition-all duration-75"
        >
          creating new Product...
        </h1>
        <BasicInfo
          product={product}
          setProduct={setProduct}
          setIsAddingProduct={setIsAddingProduct}
        />
      </div>
      {/* ProductMoreInfo */}
      <div className="mx-auto mb-10 flex flex-col justify-center gap-10 font-sans md:flex-row ">
        <Characteristics product={product} setProduct={setProduct} />
        <Description product={product} setProduct={setProduct} />
      </div>
    </form>
  );
};

export default AddProduct;
