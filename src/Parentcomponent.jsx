import React from 'react';
import DataProvider from './Dataprovider';
import Toolbar from './Toolbar';
import Tableequipment from './Tableequipment';

const Parentcomponent = () => {
  return (
    <DataProvider>
      <Toolbar />
      <Tableequipment />
    </DataProvider>
  );
};

export default Parentcomponent;
