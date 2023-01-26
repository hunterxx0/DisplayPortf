import { useOutletContext } from 'react-router-dom';
import { useGetRequestedProducts } from '../../hooks/useGetRequestedProducts';
import LoadingSpinner from '../../Utils/LoadingSpinner';
import ModalOverlay from '../../Utils/ModalOverlay';
import RequestCard from './RequestCard';

const Requests = () => {
  const { user } = useOutletContext();
  const { requestedProducts, loading } = useGetRequestedProducts(
    user?.requests
  );

  if (loading)
    return (
      <ModalOverlay>
        <LoadingSpinner />
      </ModalOverlay>
    );
  return (
    <>
      <div className="py-4"></div>
      <div
        className="h-full w-full max-w-7xl p-4 shadow-sm shadow-black"
        style={{ backgroundColor: '#231f20' }}
      >
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:grid-cols-4">
          {requestedProducts.map((reqProd, idx) => (
            <RequestCard
              key={idx}
              product={reqProd.product}
              requests={reqProd.requests}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Requests;
