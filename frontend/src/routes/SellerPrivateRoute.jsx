import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/user-context';
import { useGetSeller } from '../hooks/useGetSeller';

const SellerPrivateRoute = ({ children }) => {
  const { sellername } = useParams();
  const { user } = useAuth();
  const { seller } = useGetSeller(sellername);
  if (user?.me?.role === 'seller' && user?.me?.name === seller.name)
    return children;
};

export default SellerPrivateRoute;
