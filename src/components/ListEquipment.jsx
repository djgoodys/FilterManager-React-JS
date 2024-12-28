import React, { useState, useEffect, useContext } from 'react';
import Datatable from "./Datatable";
import Toolbar from "./Toolbar";
import { DataContext } from './Dataprovider';
import { managEquipment } from '../thunks/equipmentThunk';
import { useSelector, useDispatch } from 'react-redux';


const ListEquipment = () => {

  const dispatch = useDispatch();
  const [jsonObject, setJsonObject] = useState(null);
  const [isOverdue, setIsOverdue] = useState(false);
  const data = useSelector((state) => state.data)
  const filterOverdue = (data) => {
    const today = new Date();
    return data.filter(item => {
      const filterDate = new Date(item.filters_due);
      return filterDate >= today;
    });
  };

  const filteredData = isOverdue && Array.isArray(jsonObject) ? filterOverdue(jsonObject) : jsonObject;

  return (
    <div>
      {filteredData && (
        <Datatable />
      )}
    </div>
  );
};

export default ListEquipment;
