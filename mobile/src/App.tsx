import React from 'react';
import { AuthProvider } from './context/AuthContext';
import RootNavigator from './navigation';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
};

export default App;
