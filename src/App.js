import React, { useEffect, useState } from 'react';
import TblLogin from './components/TableLogin.jsx'
import NavButtons from './components/Navbuttons.jsx'
import Tasks from './components/Tasks.jsx';
import Admin from './components/Admin.jsx'
import Filters from './components/Filters.jsx'
import FilterTypes from './components/FilterTypes.jsx'
import ListEquipment from './components/ListEquipment'
import About from './components/About.jsx'
import Print from './components/Print.jsx'
import { useSelector} from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from "./components/Datatable"
const App = () => {
  console.log("base name: ", process.env.REACT_APP_BASENAME)
  return (
    <div>
        <Router basename= {process.env.REACT_APP_BASENAME} future={{
          v7_startTransition: true,
        }}>
          <Routes>
            <Route path="/" element={<TblLogin />} />
            <Route path="/list_equipment" element={<><NavButtons /><DataTable /></>} />
            <Route path="/tasks" element={<><NavButtons /><Tasks /></>} />
            <Route path="/admin" element={<><NavButtons /><Admin /></>} />
            <Route path="/filters" element={<><NavButtons /><Filters /></>} />
            <Route path="/filter-types" element={<><NavButtons /><FilterTypes /></>} />
            <Route path="/about" element={<><NavButtons /><About /></>} />
            <Route path="/print" element={<><NavButtons /><Print /></>} />
          </Routes>
        </Router>
    </div>

  );
}
export default App;
