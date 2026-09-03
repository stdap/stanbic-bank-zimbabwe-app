import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Animated,
} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { useAuth } from '../hooks/useAuth';

const BiometricLoginScreen: React.FC = () => {
  const [email, setEmail] = useState('demo@stanbic.com');
  const [isLoading, setIsLoading] = useState(false);
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);
  const [biometricType, setBiometricType] = useState<'fingerprint' | 'faceId'>('fingerprint');
  const scaleValue = new Animated.Value(1);
  const { biometricLogin } = useAuth();

  useEffect(() => {
    checkBiometricAvailability();
  }, []);

  const checkBiometricAvailability = async () => {
    try {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricAvailable(compatible);

      if (compatible) {
        const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
        if (types.includes(LocalAuthentication.AuthenticationType.FACE)) {
          setBiometricType('faceId');
        }
      }
    } catch (error) {
      console.error('Biometric check error:', error);
    }
  };

  const handleBiometricAuth = async () => {
    setIsLoading(true);
    // Animate the scanner
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    try {
      // Simulate biometric authentication
      if (isBiometricAvailable) {
        await LocalAuthentication.authenticateAsync({
          disableDeviceFallback: false,
          reason: 'Authenticate to access your Stanbic Bank account',
        });
      }

      // Call the biometric login service
      await biometricLogin(email, biometricType);
    } catch (error: any) {
      if (error.name !== 'UserCancelledError') {
        Alert.alert('Authentication Failed', 'Please try again or use password login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Stanbic Banking</Text>
        <Text style={styles.subtitle}>Biometric Login</Text>
      </View>

      <View style={styles.scannerContainer}>
        <Animated.View
          style={[styles.scanner, { transform: [{ scale: scaleValue }] }]}
        >
          <Text style={styles.scannerIcon}>
            {biometricType === 'faceId' ? '👤' : '👆'}
          </Text>
        </Animated.View>
        <Text style={styles.scannerLabel}>
          {biometricType === 'faceId'
            ? 'Position your face in front of the camera'
            : 'Place your finger on the sensor'}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleBiometricAuth}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>
            {biometricType === 'faceId' ? 'Scan Face' : 'Scan Fingerprint'}
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.fallbackButton}>
        <Text style={styles.fallbackText}>Use Password Instead</Text>
      </TouchableOpacity>

      <Text style={styles.helperText}>
        Email: {email}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headerContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0066CC',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  scannerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  scanner: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#E8F0FE',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#0066CC',
    marginBottom: 16,
  },
  scannerIcon: {
    fontSize: 64,
  },
  scannerLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    maxWidth: 200,
  },
  button: {
    backgroundColor: '#0066CC',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 40,
    marginBottom: 12,
    width: '100%',
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  fallbackButton: {
    paddingVertical: 12,
  },
  fallbackText: {
    color: '#0066CC',
    fontSize: 14,
    fontWeight: '500',
  },
  helperText: {
    marginTop: 20,
    fontSize: 12,
    color: '#999',
  },
});

export default BiometricLoginScreen;
