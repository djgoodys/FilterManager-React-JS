
import React, { useState, useRef } from 'react';

import { useDispatch, useSelector  } from 'react-redux';
import FrmLogin from './FrmLogin'
import Navbuttons from './Navbuttons';
import Datatable from './Datatable';

const TblLogin = () => {
  const [serverResponse, setServerResponse] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [noUsers, setNoUsers] = useState(false);
  const txtUserNameRef = useRef(null);
  const dispatch = useDispatch()
  function stringToBoolean(str) {
    return str.toLowerCase() === 'true';
  }
  let loggedIn = false
  const localStorageLoggedIn = localStorage.getItem("loggedin") || "false"
  const wasloggedIn = stringToBoolean(localStorageLoggedIn) || false
  
  const stateloggedIn = useSelector((state)=>state.loggedIn.loggedIn)
  if(stateloggedIn || wasloggedIn == true){loggedIn = true}
  return (
    <div>
          <div className="App">
    </div>
        {loggedIn ? (
        <><Navbuttons /><Datatable /></>
        ):( <FrmLogin />)}
            
    </div>
  )
}
export default TblLogin;
