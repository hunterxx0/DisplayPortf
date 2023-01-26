import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Tooltip } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { deleteProduct } from '../../apis/deleteProduct';
import { useAuth } from '../../contexts/user-context';
import { useGetSellerProducts } from '../../hooks/useGetSellerProducts';
import AddProduct from '../Products/Add/AddProduct';

const SellerProducts = () => {
  const [addingProduct, setIsAddingProduct] = useState(false);
  const [seller] = useOutletContext();
  const { products, setProducts } = useGetSellerProducts(seller);
  const { user: u } = useAuth();
  let timeoutId;

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const action = (snackbarId) => (
    <div className="flex gap-x-2">
      <button
        onClick={() => {
          clearTimeout(timeoutId);
          closeSnackbar(snackbarId);
          enqueueSnackbar('canceled');
        }}
      >
        Undo
      </button>
      <button
        onClick={() => {
          closeSnackbar(snackbarId);
        }}
      >
        Dismiss
      </button>
    </div>
  );

  const handleClick = (productId) => {
    enqueueSnackbar(`Your product will be deleted in 5 seconds...`, {
      action,
    });
    timeoutId = setTimeout(() => {
      deleteProduct(productId)
        .then(() =>
          setProducts((prev) =>
            prev.filter((product) => product._id !== productId)
          )
        )
        .catch((err) => console.error(err));
    }, 5000);
  };
  return (
    <div
      className="flex h-full w-full max-w-7xl  justify-center bg-transparent p-4 shadow-sm shadow-black"
      style={{ backgroundColor: '#231f20' }}
    >
      {addingProduct ? (
        <AddProduct
          addingProduct={addingProduct}
          setIsAddingProduct={setIsAddingProduct}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center p-8">
          <div className="grid w-full gap-6 backdrop-blur-sm md:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <div
                className="group relative flex flex-col items-center p-6"
                key={product._id}
              >
                {['seller', 'admin'].includes(u?.me?.role) &&
                seller.name === u?.me?.name ? (
                  <div className="absolute -right-4 top-4 cursor-pointer hover:opacity-80">
                    <Tooltip title="Delete">
                      <button onClick={() => handleClick(product._id)}>
                        <DeleteOutlineIcon
                          className="text-orange-200 hover:text-orange-600"
                          fontSize="large"
                        />
                      </button>
                    </Tooltip>
                  </div>
                ) : null}
                <div className="p-2"></div>
                <Link to={`/products/${product._id}`} key={product._id}>
                  <div className="p-2">
                    <div className="">
                      <img
                        className="transition hover:scale-110 "
                        src={
                          product.pics_url[0] ||
                          'https://leaveitwithme.com.au/wp-content/uploads/2013/11/dummy-image-square.jpg'
                        }
                        alt=""
                      />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {['seller', 'admin'].includes(u?.me?.role) &&
      seller.name === u?.me?.name ? (
        <div>
          {!addingProduct ? (
            <Tooltip title="Add product">
              <button
                className="rounded-md p-0.5 font-cairo font-extrabold  hover:opacity-80"
                style={{ color: 'rgb(26,21,21)' }}
                onClick={() => {
                  setIsAddingProduct(true);
                }}
              >
                <AddCircleOutlineIcon
                  className="text-white hover:text-orange-600"
                  fontSize="large"
                />
              </button>
            </Tooltip>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default SellerProducts;
