import React from 'react';
import Router from './router';
import {NativeBaseProvider} from 'native-base';

const App = () => {
  return (
    <NativeBaseProvider>
      <Router />
    </NativeBaseProvider>
  );
};

export default App;
