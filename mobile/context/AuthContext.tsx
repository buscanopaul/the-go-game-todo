import { createContext, useContext, useEffect, useState } from 'react';
import { apiClient } from '../api/client';

const AuthContext = createContext<{
  isAuthenticated: boolean;
  login: () => Promise<void>;
}>({
  isAuthenticated: false,
  login: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async () => {
    await apiClient.post('/auth/login');
    setIsAuthenticated(true);
  };

  useEffect(() => {
    apiClient
      .get('/todos')
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false));
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
