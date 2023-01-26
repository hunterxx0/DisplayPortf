import { faHeart, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { addProductToUserFavorites } from '../../apis/addProductToUserFavorites';
import { removeProductFromUserFavorites } from '../../apis/removeProductFromUserFavorites';
import ModalOverlay from '../../Utils/ModalOverlay';
import ProfileDraw from '../Header/ProfileDraw';
import '../Home/HomeExplore.css';

const Product = styled.div`
  &:nth-child(${(props) => props.index}):before {
    background-image: url(${(props) => props.image});
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
  }
`;

const ProductCard = ({ product, index, user = {}, u, toggle, isVisible }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const handleClick = () => {
    if (!isFavorite)
      addProductToUserFavorites(user._id, product?._id)
        .then((res) => {
          setIsFavorite(true);
        })
        .catch((err) => console.error(err));
    else {
      removeProductFromUserFavorites(user._id, product?._id)
        .then((res) => {
          setIsFavorite(false);
        })
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    setIsFavorite(
      user?.favorites?.some((favorite) => favorite === product?._id)
    );
  }, [user, product?._id]);

  return (
    <>
      <Product
        className="product__card relative flex h-72 w-[200px] select-none justify-end overflow-hidden bg-gray-100 
       text-center text-gray-100"
        index={index + 1}
        image={product?.pics_url ? product?.pics_url?.[0] : ''}
        tabIndex={0}
      >
        <div className="product__card--content">
          <h2 className="product__card--seller capitalize">
            {product?.seller_name}
          </h2>
          <div className="flex gap-2  text-gray-900">
            <div className="rounded-full  p-1 ">
              <Link to={`/products/${product?._id}`} key={product?._id}>
                <FontAwesomeIcon
                  className="cursor-pointer hover:opacity-60"
                  icon={faSearch}
                  size="lg"
                  color="white"
                />
              </Link>
            </div>

            {!['seller', 'admin'].includes(u?.role) ? (
              <div className="rounded-full p-1">
                <FontAwesomeIcon
                  className={`cursor-pointer ${
                    isFavorite
                      ? 'text-red-500 hover:text-white'
                      : 'text-white hover:text-red-500'
                  }`}
                  icon={faHeart}
                  size="lg"
                  onClick={() => {
                    //useShowLoginModal if not logged in
                    u === undefined && toggle();
                    u?.role && handleClick();
                  }}
                />
              </div>
            ) : null}
          </div>
          <p className="product__card--name hidden capitalize sm:block">
            {product?.title}
          </p>
        </div>
      </Product>
      {isVisible ? (
        <ModalOverlay IsOpen={isVisible} setIsOpen={toggle}>
          <ProfileDraw profileIsOpen={isVisible} showProfileDraw={toggle} />
        </ModalOverlay>
      ) : null}
    </>
  );
};

export default ProductCard;
