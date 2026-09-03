import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LoginCredentials {
  email: string;
  password: string;
}

interface BiometricLoginData {
  email: string;
  biometricType: 'fingerprint' | 'faceId';
}

export const authService = {
  async login(credentials: LoginCredentials) {
    const response = await api.post('/auth/login', credentials);
    const { token, user } = response.data;
    
    await AsyncStorage.setItem('authToken', token);
    await AsyncStorage.setItem('user', JSON.stringify(user));
    
    return { token, user };
  },

  async biometricLogin(data: BiometricLoginData) {
    // Simulate 2-3 second biometric processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const response = await api.post('/auth/biometric-login', data);
    const { token, user } = response.data;
    
    await AsyncStorage.setItem('authToken', token);
    await AsyncStorage.setItem('user', JSON.stringify(user));
    
    return { token, user };
  },

  async registerBiometric(email: string, biometricType: 'fingerprint' | 'faceId') {
    const response = await api.post('/auth/register-biometric', {
      email,
      biometricType,
    });
    return response.data;
  },

  async logout() {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('user');
    }
  },

  async getStoredToken() {
    return await AsyncStorage.getItem('authToken');
  },

  async getStoredUser() {
    const userStr = await AsyncStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },
};
