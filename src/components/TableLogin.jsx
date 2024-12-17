
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
  //const userData = useSelector((state) => state.userData)
  const loggedIn = useSelector((state) => state.loggedIn)
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
