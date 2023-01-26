import React, { createContext, useContext } from 'react';
import useClient from '../hooks/useClient';

const UserContext = createContext();

const AuthProvider = (props) => {
  const {
    user = {},
    error = null,
    isError = false,
    isLoading = true,
    logout = () => {},
  } = useClient();

  const authContextValue = { user, error, isError, isLoading, logout };
  return <UserContext.Provider value={authContextValue} {...props} />;
};

const useAuth = () => useContext(UserContext);

export { AuthProvider, useAuth };
