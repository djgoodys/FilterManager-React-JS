import React, { useState, useContext, useEffect, useRef } from 'react'
import { manageEquipment } from '../thunks/equipmentThunk';
import { useDispatch } from 'react-redux';
import searchImage from '../images/search3.png';

const Search = () => {
  const originalDataRef = useRef([]);
  const [filteredUnits, setFilteredUnits] = useState([]);
  let [searchInput, setSearchInput] = useState('');
  let newFilteredUnits = useRef([]);
  let [ULClass, setULClass] = useState('ULSearchHidden');
  let LiSearch = useRef('LiSearch');
  const [datasource, setdatasource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchInputRef = useRef(null);
  const [data, setData] = useState([])
  const dispatch = useDispatch()
  const [serverResponse, setServerResponse] = useState('')



  function submitSearch() {

    const backup_folder = localStorage.getItem("backup_folder")
    const obj = {
      searchwords: searchInputRef.current.value,
      backup_folder: backup_folder,
      action: 'search'
    }
    dispatch(manageEquipment(obj))
    setULClass('ULSearchHidden');
  }

  const toggleClass = (classx) => {
    //setULClass(prevClass => (searchInput.length === 0 ? 'ULSearchHidden' : 'ULSearchVisible'));

    switch (classx) {
      case 'ULSearchVisible':
        setULClass('ULSearchVisible');
        break;
      case 'ULSearchHidden':
        setULClass('ULSearchHidden');
        break;
      default:
        break;
    }
  };

  const filterUnits = () => {
    searchInput.length === 0 ? toggleClass('ULSearchHidden') : toggleClass('ULSearchVisible');

    let newFilteredUnits = originalDataRef.current.filter(item => {
      return item.unit_name.toLowerCase().includes(searchInput.toLowerCase());
    });
    setFilteredUnits(newFilteredUnits);

  }
  useEffect(() => {
    setULClass('ULSearchVisible');


    filterUnits(datasource);
  }, [searchInput, datasource]);
  const SearchQry = (searchwords) => {
    fetch('http://localhost/filtermanagerreact/php/ListEquipment.php?backup_folder=hard_rock&search_input=' + searchwords, {
      method: 'GET',
      credentials: 'include'
    })
      .then
      (response => {
        if (!response.ok) {
          throw new Error('Network response was not ok from Search.jsx ' + response.statusText);
        }
        return response.text();
      })
      .then(data => {
        //console.log("Fetched Data from a search query Search.jsx:", data);
        setData(data);
        setServerResponse(data);
      })
      .catch(error => {
        //console.log('Fetch Error:', error);
        setServerResponse('An error occurred(Search.jsx):' + error.message);
      });
  }

  function resetUnits() {
    let newFilteredUnits = originalDataRef.current.map(item => {
      return {
        unit_name: item // Assign the string value to the unit_name key
      };
    });
    setFilteredUnits(newFilteredUnits);
    //setdatasource(newFilteredUnits);

  }

  //   function myFunction(){
  //     if(searchInput.length === 0){
  //       toggleClass('ULSearchHidden');
  //       fetchData();
  //       return;
  //     }
  //     else
  //     {
  //     filterUnits();
  //   }
  // }

  useEffect(() => {
    document.getElementById("search-input").addEventListener("search", function (event) {
      searchInput = "";
      toggleClass('ULSearchHidden');
      // fetchData();
      // filterUnits();
    }
    )
  }, [])


  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent default behavior
      submitSearch();
    }
  };
  useEffect(() => {
    const inputElement = searchInputRef.current;
    inputElement.addEventListener('keydown', handleKeyDown);
  })

  return (
    <div className="search">
      <div style={{ display: "flex" }}>
        <input
          input type="search"
          id="search-input"
          placeholder="Search"
          ref={searchInputRef}
          value={searchInput}
          onChange={event => { setSearchInput(event.target.value); }}

        />
        <ul className={ULClass} >
          {filteredUnits.map(unit => (
            <li className={"LiSearch"} key={unit.id} onClick={() => submitSearch(unit.unit_name)}>{unit.unit_name}</li>
          ))}
        </ul>
        <img src={searchImage} style={{ boxShadow: '4px 4px black', height: '50px', width: '50px', marginLeft: '5px', borderRadius: '30px', border: '3px solid green', textAlign: 'middle' }} id="img_search" onClick={() => submitSearch()} />
      </div>
      <div id="divServerResponse" style={{ display: 'none', height: '200px', width: '200px' }}>{serverResponse}</div>
    </div>
  )
}

export default Search