import React from 'react';
import Routes from './src/routes';
import {AuthProvider} from './src/contexts/auth';

const App = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default App;
