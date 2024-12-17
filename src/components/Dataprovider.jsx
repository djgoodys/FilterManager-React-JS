import React, { createContext, useState, useEffect } from 'react';
import store from '../store/store.js'
import { Provider } from 'react-redux';

const Dataprovider = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export default Dataprovider;