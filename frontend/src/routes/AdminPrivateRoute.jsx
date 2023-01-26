import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/user-context';

const AdminPrivateRoute = ({ children }) => {
  const { adminId } = useParams();
  const { user } = useAuth();
  if (user?.me?.role === 'admin' && user?.me?.id === adminId) return children;
};

export default AdminPrivateRoute;
