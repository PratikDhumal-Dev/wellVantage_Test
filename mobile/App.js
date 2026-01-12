import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { AppNavigator } from './src/navigation/AppNavigator';
import { configureGoogleSignIn } from './src/services/googleSignInService';

const App = () => {
  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <AppNavigator />
    </>
  );
};

export default App;


