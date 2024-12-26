import React, { useState, useEffect, useContext, useRef } from 'react'
import '../css/fm.css';
import { useDispatch, useSelector } from 'react-redux'
import { manageEquipment } from '../thunks/equipmentThunk';

const Filtersdone = ({ unit_id = "000", rotation = 1, filter_types }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [ckFiltersDoneClass, setckFiltersDoneClass] = useState("switch")
  const dispatch = useDispatch()
  const loading = useSelector(state => state.loading);
  const error = useSelector(state => state.error);
  const [slctFilter, setSlctFilter] = useState('')
  const refslctFilter = useRef(null)
  const userName = localStorage.getItem('username')
  const [showTypes, setShowTypes] = useState(false)
  const backup_folder = localStorage.getItem("backup_folder")
  function filtersDone(event) {
    setShowTypes(false);
    setIsChecked(event.target.checked);
  }


  function setFiltersDone() {
    setShowTypes(false)
    const backup_folder = localStorage.getItem("backup_folder")
    const username = localStorage.getItem("username")
    const vars =
    {
      backup_folder: backup_folder,
      action: "filtersdone",
      unit_id: unit_id,
      rotation: rotation,
      filter_type: refslctFilter.current.value,
      username: username
    }
    const ret = dispatch(manageEquipment(vars))
      .then((response) => {
        //console.log("data = "+response.payload.equipment); 
      })
      .then(data => {
        console.log("FROM DATATABLE " + data["equipment"][0]);
        //data = data
      })
      .catch((error) => {
        console.error('Fetch error:', error); // Handle any errors
      });
  }


  if (loading) {
    return <p>Loading...</p>;
  } if (error) {
    return <p>Error: {error}</p>;

  } if (!filter_types || filter_types.length === 0) {
    return <p>Loading...</p>

  }
  return (
    <div>
      <label className={showTypes ? "switch-invisible" : "switch"}>
        <input type="checkbox" id="ckShowFilterTypes" onChange={() => setShowTypes(true)} checked={isChecked}  />
        <span className="slider round"></span>
      </label>
      <div>
        <select id="slct-filter-type" value={slctFilter} ref={refslctFilter}
          style={{ display: showTypes ? "block" : "none" }}
          onChange={(event) => {
            setSlctFilter(event.target.value);
            setFiltersDone()
          }}
        >
          <option disabled selected>Select Filter Type</option>
          {filter_types.map((item, index) => (
            <option key={index}>{item}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default Filtersdone