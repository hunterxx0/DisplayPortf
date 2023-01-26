import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/user-context';
import useGetUser from '../hooks/useGetUser';

const UserPrivateRoute = ({ children }) => {
  const { username } = useParams();
  const { user: u } = useAuth();
  const { user } = useGetUser(username);
  if (u?.me?.role === 'user' && u?.me?.id === user._id) return children;
};

export default UserPrivateRoute;
