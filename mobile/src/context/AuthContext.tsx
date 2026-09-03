import React, { createContext, useState, useCallback } from 'react';
import { authService } from '../services/authService';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isSignedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  biometricLogin: (email: string, type: 'fingerprint' | 'faceId') => Promise<void>;
  logout: () => Promise<void>;
  restoreToken: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isSignedIn: false,
  login: async () => {},
  biometricLogin: async () => {},
  logout: async () => {},
  restoreToken: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const restoreToken = useCallback(async () => {
    try {
      const storedUser = await authService.getStoredUser();
      if (storedUser) {
        setUser(storedUser);
      }
    } catch (error) {
      console.error('Token restore error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    restoreToken();
  }, [restoreToken]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const { user } = await authService.login({ email, password });
      setUser(user);
    } catch (error) {
      throw error;
    }
  }, []);

  const biometricLogin = useCallback(
    async (email: string, type: 'fingerprint' | 'faceId') => {
      try {
        const { user } = await authService.biometricLogin({ email, biometricType: type });
        setUser(user);
      } catch (error) {
        throw error;
      }
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      throw error;
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isSignedIn: !!user,
        login,
        biometricLogin,
        logout,
        restoreToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
