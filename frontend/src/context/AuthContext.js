import React, {
  createContext, useState, useContext, useMemo,
} from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [userName, setUserName] = useState(localStorage.getItem('username') || '');

  const saveAuthData = (newToken, newUserName) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('username', newUserName);
    setToken(newToken);
    setUserName(newUserName);
  };

  const clearAuthData = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setToken(null);
    setUserName('');
  };

  const value = useMemo(() => (
    {
      token,
      userName,
      saveAuthData,
      clearAuthData,
    }
  ), [token, userName]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
