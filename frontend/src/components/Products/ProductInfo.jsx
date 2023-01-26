import {
  faCalculator,
  faClock,
  faClose,
  faDollarSign,
  faHeart,
  faLocationDot,
  faTag,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Rating, Tooltip } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { addProductToUserFavorites } from '../../apis/addProductToUserFavorites';
import { deleteProduct } from '../../apis/deleteProduct';
import { removeProductFromUserFavorites } from '../../apis/removeProductFromUserFavorites';
import { useProduct } from '../../contexts/product-context';
import { countries } from '../../mockdata/countries';

import ModalOverlay from '../../Utils/ModalOverlay';
import useUtils from '../../Utils/useUtils';
import ZoomImage from '../../Utils/ZoomImage';
import ProfileDraw from '../Header/ProfileDraw';
import FormRequest from './FormRequest';

const ProductInfo = ({
  seller,
  user = {},
  u,
  setUser,
  isEditing,
  setIsEditing,
  productId,
  toggle,
  isVisible,
}) => {
  const { REVIEW_PARTICIPANTS, RESPONSE_TIME } = useUtils();
  const { product } = useProduct();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isFavorite, setIsFavorite] = useState(
    user?.favorites?.includes(product._id)
  );
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

  const handleImageSelect = (idx) => {
    setSelectedImage(idx);
  };

  const handleModal = () => {
    setModalIsOpen((prev) => !prev);
  };

  const handleFormModal = () => setIsFormOpen((prev) => !prev);

  const handleClickFavorite = (isFavorite) => {
    if (!isFavorite) {
      addProductToUserFavorites(user._id, product._id).then(() => {
        setUser((prev) => ({
          ...prev,
          favorites: [...prev.favorites, productId],
        }));
        setIsFavorite(true);
      });
    } else {
      removeProductFromUserFavorites(user._id, product._id).then(() => {
        setUser((prev) => ({
          ...prev,
          favorites: prev.favorites.filter((id) => id !== productId),
        }));
        setIsFavorite(false);
      });
    }
  };

  const handleClick = () => {
    enqueueSnackbar(`Your product will be deleted in 5 seconds...`, {
      action,
    });
    timeoutId = setTimeout(() => {
      deleteProduct(productId).then(() => setIsDeleted(true));
    }, 5000);
  };

  useEffect(() => {
    setIsFavorite(user?.favorites?.includes(productId) || false);
    return () => setSelectedImage(0);
  }, [user.favorites, productId]);

  if (isDeleted) return <Navigate to={`/`} replace={true} />;

  return (
    <div
      className={`relative mx-auto  mb-10 flex flex-col-reverse gap-10 bg-orange-300 py-16 px-4 
      font-sans shadow-sm shadow-gray-400 md:flex-row`}
    >
      <div className="flex flex-1 flex-col justify-center gap-4">
        <div>
          {modalIsOpen ? (
            <FontAwesomeIcon
              className="fixed top-0 right-0 z-30 cursor-pointer px-4  text-4xl text-white"
              icon={faClose}
              onClick={handleModal}
            />
          ) : (
            ''
          )}
          <img
            className="cursor-zoom-in"
            src={
              product?.pics_url.length ? product?.pics_url[selectedImage] : ''
            }
            alt=""
            onClick={handleModal}
          />
        </div>
        <div className="flex flex-wrap gap-1">
          {product?.pics_url.length > 1 &&
            product?.pics_url.map((url, idx) => (
              <img
                className={`mx-auto h-16 w-24 cursor-pointer border-2 shadow-sm hover:border-gray-900 ${
                  selectedImage === idx ? 'border-4 border-gray-900' : ''
                } hover:shadow-lg`}
                src={url}
                alt=""
                key={uuidv4()}
                onClick={() => {
                  handleImageSelect(idx);
                }}
              />
            ))}
        </div>
        {!['seller', 'admin'].includes(u?.role) ? (
          <div className="self-center">
            {/* this will not appear for sellers */}
            <div className="flex cursor-pointer items-center gap-2 hover:underline hover:opacity-60">
              <FontAwesomeIcon className="text-red-600" icon={faHeart} />
              <p
                className="text-sm font-thin"
                onClick={() => {
                  u === undefined && toggle();
                  u?.role === 'user' && handleClickFavorite(isFavorite);
                }}
              >
                {' '}
                {!isFavorite
                  ? 'add to your favorites'
                  : 'remove from  your favorites'}{' '}
              </p>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
      <div className="flex flex-1 flex-col gap-8">
        <div className="text-3xl md:w-full">
          <h2 className="font-bold">{product.title}</h2>
        </div>
        <div className="flex gap-2">
          {product.tags.map((tag) => (
            <div
              className="flex items-center gap-1 rounded-full border-x-4 px-2 py-1"
              key={uuidv4()}
            >
              <FontAwesomeIcon className="text-white" icon={faTag} />
              <p className=" whitespace-nowrap font-cairo text-sm font-extralight italic opacity-80">
                {tag}
              </p>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <p>Sold by:</p>
          <div className="flex items-center gap-4">
            <Link to={`/seller/${product?.seller_name}`}>
              <h2 className="text-2xl font-bold tracking-wider transition hover:text-orange-900">
                {product?.seller_name}
              </h2>
            </Link>
            <span className="relative flex items-center gap-2">
              <FontAwesomeIcon
                className="text-white"
                icon={faLocationDot}
                size="lg"
              />{' '}
              <span
                className={`fi fi-${
                  seller.seller_country?.toLowerCase() in countries
                    ? countries[seller.seller_country?.toLowerCase()]
                    : countries['unknown']
                } peer cursor-help`}
              ></span>{' '}
              <span
                className="text-md absolute top-1/2 left-12 hidden rounded-full rounded-tl-none bg-gray-900 px-2  
              text-white opacity-80 peer-hover:inline-block"
              >
                {' '}
                {seller.seller_country}
              </span>
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p>Category:</p>
          <div className="flex items-center gap-4">
            <Link to={`/category/${product?.category.toLowerCase()}`}>
              <h2 className="text-2xl font-bold tracking-wider transition hover:text-orange-900">
                {product?.category}
              </h2>
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="">
            <Rating
              sx={{ color: 'orangered' }}
              name="half-rating-read"
              defaultValue={2.5}
              precision={0.5}
              readOnly
              size="large"
            />
          </div>
          <p className="font-sm font-thin">
            Feedback on the quality of responses from{' '}
            <span className="font-semibold">{REVIEW_PARTICIPANTS}</span> buyers
          </p>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon className="text-sm" icon={faClock} />
            <p>
              This seller generally responds in under{' '}
              <span className="font-semibold"> {RESPONSE_TIME} </span> hours
            </p>
          </div>
        </div>{' '}
        {!['seller', 'admin'].includes(u?.role) ? (
          <div className="self-center">
            <div className="flex flex-col gap-2 text-lg">
              <button
                className="space-x-1 border-2 bg-transparent p-2 font-sans font-bold tracking-wide text-gray-900 hover:bg-gray-900 hover:text-white"
                onClick={() => {
                  u === undefined && toggle();
                  u?.role === 'user' && handleFormModal();
                }}
              >
                <FontAwesomeIcon icon={faDollarSign} />{' '}
                <span>Request price options</span>
              </button>
              <button
                className="space-x-1 whitespace-nowrap border-2 p-2 font-sans font-bold tracking-wide  text-gray-900 hover:bg-gray-900 hover:text-white"
                onClick={() => {
                  u === undefined && toggle();
                  u?.role === 'user' && handleFormModal();
                }}
              >
                <FontAwesomeIcon icon={faCalculator} />{' '}
                <span>Request a personalized quote</span>
              </button>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>

      {modalIsOpen ? (
        <ModalOverlay IsOpen={modalIsOpen} setIsOpen={handleModal}>
          <ZoomImage
            images={product?.pics_url}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            image={product?.pics_url[selectedImage]}
            className="block h-auto max-h-full w-auto max-w-full opacity-100"
          />
        </ModalOverlay>
      ) : (
        ''
      )}
      {u?.role === 'seller' && product?.seller_name === u?.name ? (
        <div>
          <div
            className="absolute top-0 right-0  rounded-md 
                        p-0.5 font-cairo font-extrabold "
            style={{ color: 'rgb(26,21,21)' }}
          >
            <Tooltip title="Delete">
              <button onClick={handleClick}>
                <DeleteOutlineIcon
                  className="hover:text-orange-600"
                  fontSize="large"
                />
              </button>
            </Tooltip>

            <Tooltip title="Edit">
              <button
                onClick={() => {
                  setIsEditing((prev) => !prev);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <EditOutlinedIcon
                  className="hover:text-orange-600"
                  fontSize="large"
                />
              </button>
            </Tooltip>
          </div>
        </div>
      ) : (
        ''
      )}
      {isFormOpen ? (
        <ModalOverlay IsOpen={isFormOpen} setIsOpen={handleFormModal}>
          <FormRequest
            product={product}
            handleFormModal={handleFormModal}
            user={user}
            seller={seller}
          />
        </ModalOverlay>
      ) : null}
      {isVisible ? (
        <ModalOverlay IsOpen={isVisible} setIsOpen={toggle}>
          <ProfileDraw profileIsOpen={isVisible} showProfileDraw={toggle} />
        </ModalOverlay>
      ) : null}
    </div>
  );
};

export default ProductInfo;
