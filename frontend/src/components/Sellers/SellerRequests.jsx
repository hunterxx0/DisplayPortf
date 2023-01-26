import React from 'react';
import { useOutletContext } from 'react-router-dom';
import UseGetSellerProductsByName from '../../hooks/UseGetSellerProductsByName';
import LoadingSpinner from '../../Utils/LoadingSpinner';
import RequestCard from '../Profile/RequestCard';
import RequestOverviewInfo from './RequestOverviewInfo';

const SellerRequests = () => {
  const [seller] = useOutletContext();
  const { requestedProds, loading } = UseGetSellerProductsByName(seller);
  if (loading) return <LoadingSpinner />;
  return (
    <div
      className="flex w-full max-w-7xl flex-col  justify-center gap-y-4 bg-transparent p-4 shadow-sm
    shadow-black"
      style={{ backgroundColor: '#231f20' }}
    >
      {requestedProds.map((reqProd, idx) => (
        <div key={idx} className="flex w-full gap-4 backdrop-blur-md">
          <div className="w-[25%] p-4 shadow-sm shadow-black">
            <RequestCard
              product={reqProd.product}
              requests={reqProd.requests}
            />
          </div>
          <div className="w-[75%] p-4  shadow-sm shadow-black">
            {reqProd.requests.map((req) => (
              <RequestOverviewInfo key={req.id} userId={req.user_id} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SellerRequests;
