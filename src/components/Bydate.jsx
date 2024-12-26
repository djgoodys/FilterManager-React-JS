import React, { useState } from 'react'
import { manageEquipment } from '../thunks/equipmentThunk';
import { useDispatch } from 'react-redux'

const Bydate = () => {
  const dispatch = useDispatch()
  const [isActive, setActive] = useState(false);
  const [data, setData] = useState([])
  const [serverResponse, setServerResponse] = useState('')
  const toggleClass = () => {
    setActive(!isActive);
  };

  function sort(sortType) {
    const backup_folder = localStorage.getItem("backup_folder")
    const obj = {
      action: "sort",
      backup_folder: backup_folder,
      sortby: sortType
    }
    dispatch(manageEquipment(obj))

  }

  return (
    <div className="Bydate-container" onClick={toggleClass} >By date
      <div className={isActive ? 'openNav' : 'closeNav'} id="nav">
        <div className="nav-item" onClick={() => { sort('ASC') }}>Newest to oldest</div>
        <div className="nav-item" onClick={() => { sort('DESC') }}>Oldest to newest</div>
        <div className="nav-item" onClick={() => { sort('today') }}>Today</div>
        <div className="nav-item" onClick={() => { sort('NORMAL') }}>Normal</div>
      </div>
    </div>
  )
}

export default Bydate