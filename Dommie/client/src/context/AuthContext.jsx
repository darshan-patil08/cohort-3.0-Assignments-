/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import api, { setAccessToken } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessTokenState, setAccessTokenState] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      if (localStorage.getItem('has_session') !== 'true') {
        setIsLoading(false);
        return;
      }

      try {
        const refreshRes = await api.post('/auth/refresh-token', {});
        if (refreshRes.data?.accessToken) {
          const token = refreshRes.data.accessToken;
          setAccessToken(token);
          setAccessTokenState(token);

          const meRes = await api.get('/auth/me');
          setUser(meRes.data.user);
        } else {
          localStorage.removeItem('has_session');
        }
      } catch {
        localStorage.removeItem('has_session');
        setUser(null);
        setAccessToken(null);
        setAccessTokenState(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    const handleSessionExpired = () => {
      localStorage.removeItem('has_session');
      setUser(null);
      setAccessToken(null);
      setAccessTokenState(null);
    };

    window.addEventListener('session-expired', handleSessionExpired);
    return () => window.removeEventListener('session-expired', handleSessionExpired);
  }, []);

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const { accessToken, user: loggedInUser } = response.data;

    setAccessToken(accessToken);
    setAccessTokenState(accessToken);
    setUser(loggedInUser);
    localStorage.setItem('has_session', 'true');

    return response.data;
  };

  const register = async (name, email, password, confirmPassword) => {
    const response = await api.post('/auth/register', {
      name,
      email,
      password,
      confirmPassword,
    });
    return response.data;
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout', {});
    } catch {
      // Ignore network errors on logout
    } finally {
      localStorage.removeItem('has_session');
      setAccessToken(null);
      setAccessTokenState(null);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken: accessTokenState,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
