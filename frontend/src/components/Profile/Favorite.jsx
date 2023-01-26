import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetSeller } from '../../hooks/useGetSeller';
import LoadingSpinner from '../../Utils/LoadingSpinner';
import ModalOverlay from '../../Utils/ModalOverlay';
import FormRequest from '../Products/FormRequest';

const Favorite = ({ product, handleClick, user }) => {
  const { seller, loading } = useGetSeller(product?.seller_name);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFormModal = () => setIsModalOpen((prev) => !prev);

  if (loading) <LoadingSpinner />;

  return (
    <div className=" relative flex flex-col items-center p-6">
      {user?.me?.role === 'user' ? (
        <div className="absolute left-0 top-10 cursor-pointer ">
          <FontAwesomeIcon
            className={`text-red-600 hover:text-white`}
            onClick={() => handleClick(product._id)}
            icon={faHeart}
            size="lg"
          />
        </div>
      ) : null}
      <div className="p-2"></div>
      <Link to={`/products/${product._id}`} key={product._id}>
        <div className="p-2">
          <div className="">
            <img
              className="transition hover:scale-110 "
              src={product?.pics_url[0]}
              alt=""
            />
          </div>
        </div>
      </Link>
      <div className="p-4"></div>
      {user?.me?.role === 'user' ? (
        <div
          className="text-md absolute bottom-0  flex w-[95%] justify-center rounded-md
                py-1 font-cairo shadow-sm shadow-black hover:opacity-80"
        >
          <button className="text-white" onClick={handleFormModal}>
            Request price options
          </button>
        </div>
      ) : null}
      {isModalOpen ? (
        <ModalOverlay IsOpen={isModalOpen} setIsOpen={handleFormModal}>
          <FormRequest
            product={product}
            handleFormModal={handleFormModal}
            user={user}
            seller={seller}
          />
        </ModalOverlay>
      ) : null}
    </div>
  );
};

export default Favorite;
