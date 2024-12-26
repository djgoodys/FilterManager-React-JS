import React, { useState, useRef, useEffect } from 'react';
import '../css/fm.css';
import '../css/checkboxListEquipment.css';
import '../css/checkMarkTasks.css';
import Filtersdone from './Filtersdone';
import Assignedtoo from './Assignedtoo';
import { setJavaCookie, getCookie, setCookie, saveScrollPosition, setScrollPosition } from '../javafunctions';
import { useDispatch, useSelector } from 'react-redux'
import { manageFilterTypes } from '../thunks/filterTypesThunk';
import Button from 'react-bootstrap/Button';
import { manageEquipment } from '../thunks/equipmentThunk'
import { manageUsers } from '../thunks/usersThunk'
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';

const Datatable = (props) => {
    const componentRef = useRef()
    const contentRef = useRef(null);

    const [showNotes, setShowNotes] = useState(false)
    const [showTasks, setShowTasks] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [isDisabled, setIsDisabled] = useState(true);
    let filterDueDate = useRef('');
    const [AssignedToo, setAssignedToo] = useState('')
    //const [checkedItems, setCheckedItems] = useState({})
    const [TaskCheckedItems, setTaskCheckedItems] = useState({})
    const [notes, setNotes] = useState({});
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const refDivTasks = useRef(null)
    const [filter_types, setFilterTypes] = useState([])
    const [theadTop, setTheadTop] = useState('0');
    const [users, setUsers] = useState([])


    let ac_units = []

    const backup_folder = localStorage.getItem("backup_folder")
    const obj2 = {
        backup_folder: backup_folder,
        action: "get-all-units"
    }

    useEffect(() => {
        dispatch(manageEquipment(obj2))
            .then(response => {

            }
            )
            .then()
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    ac_units = useSelector((state) => state.equipment.equipment)


    let ftypes = useSelector((state) => state.types)

    const generateInitialCheckedItems = (ac_units) => {
        const initialCheckedItems = {};
        ac_units.forEach((item) => {
            initialCheckedItems[item._id] = false;
        });
        return initialCheckedItems;
    };



    useEffect(() => {
        const obj = {
            action: "get-filter-types",
            backup_folder: localStorage.getItem("backup_folder")
        }
        dispatch(manageFilterTypes(obj)).then((response) => {
            const datax = response.payload;
            datax.forEach((item => {
                ftypes = datax.map((item) => item.type);
            }))
            setFilterTypes(ftypes)
        }).catch((error) => {
            console.error('Fetch error:', error);
        });
    }, []);

    const obj = {
        backup_folder: backup_folder,
        action: "get-all-users"
    }
    const getUsers = async () => {
        const response = await dispatch(manageUsers(obj))
        const usersArray = Array.isArray(response.payload) ? response.payload : response.payload.data;
        const userNames = usersArray.map(user => user.user_name)
        setUsers(userNames)
    }

    useEffect(() => {
        getUsers()
    }, [])


    const submitTasks = () => {
        setShowTasks(false)
        const username = localStorage.getItem("username")
        const backup_folder = localStorage.getItem("backup_folder")
        const alltasks = tasks.map((task) => {
            return task.unit_id
        })
        const obj2 = {
            action: 'add-all-tasks',
            username: username,
            backup_folder: backup_folder,
            task_array: alltasks
        }
        const allunits = dispatch(manageEquipment(obj2))
        navigate("/tasks")
    }
    //ac_units = useSelector((state) => state.equipment.equipment)
    const tableRefs = useRef([]);
    const toggleClass = (event, shouldToggle, tableid) => {

        event.stopPropagation();
        const tableRef = document.getElementById("tbl" + tableid);
        if (tableRef) {
            if (tableRef.classList.contains('UnitInfoClosed')) {
                tableRef.classList.remove('UnitInfoClosed');
                tableRef.classList.add('UnitInfoOpen');
            } else {
                tableRef.classList.remove('UnitInfoOpen');
                tableRef.classList.add('UnitInfoClosed');
            }
        }
    };

    const closeUnitInfo = (id) => {
        //console.log(id);
        var tableID = "tbl" + id;
        const table = document.getElementById(tableID);
        if (table) {
            table.className = "UnitInfoClosed";
        }
    }
    const showUnitInfo = (id) => {
        var tableID = "tbl" + id;
        const table = document.getElementById(tableID);
        if (table) {
            table.className = "UnitInfoOpen";
        }
        var my_disply = document.getElementById(tableID).style.display;
        setJavaCookie("cookie_infoid", id);
        if (my_disply == "none") {
            saveScrollPosition();
            document.getElementById(tableID).style.display = "block";
            setTimeout(setScrollPosition, 100);
        } else {
            setCookie("cookie_infoid", "void");
        }
    };


    const handleNotesChange = (id, newValue) => {
        setIsDisabled(false);
        setNotes(prevNotes => ({
            ...prevNotes,
            [id]: newValue
        }));
    };

    function updateNotes(unit_id, newnotes) {
        const obj = {
            backup_folder: backup_folder,
            unit_id: unit_id,
            notes: newnotes,
            action: 'edit-unit',
            field: 'notes'
        }
        dispatch(manageEquipment(obj))
        setShowNotes(false)

    }

    const isDateOlderThanToday = (filtersDue) => {
        const today = new Date();
        const filterDate = new Date(filtersDue);
        return filterDate < today;
    }

    const getUnitName = (id) => {
        for (const item of ac_units) {
            if (item._id === id) {
                return item.unit_name;
            }
        } return null;
    };

    const notesArray = () => {
        const newNotes = [];
        for (let i = 0; i < ac_units.length; i++) {
            const item = ac_units[i];
            newNotes.push(item.notes)
        }
        setNotes(newNotes);
    }
    for (let key in notes) {
        if (notes.hasOwnProperty(key)) {
            //console.log(`Key: ${key}, Value: ${JSON.stringify(notes[key])}`);
        }
    }

    useEffect(() => {
        notesArray()
    }, [])

    const renderTableRows = () => {
        const rows = [];
        for (let i = 0; i < ac_units.length - 1; i++) {
            const item = ac_units[i];
            let x = "notoverdue";
            if (isDateOlderThanToday(item.filters_due)) {
                x = "overdue";
            } else {
                x = "notoverdue";
            }
            let task_id = "cktask" + item._id;
            filterDueDate = item.filters_due;
            rows.push(
                <tr key={item._id} className={x} >
                    <td>
                        {item.assigned_to !== "" ? (
                            <Assignedtoo assignedUsername={item.assigned_to} unit_id={item._id} users={users} />
                        ) : (
                            <label className="container">
                                <input type="checkbox" className="checkmarkListEquipment" id={item.unit_id} value="" onChange={(event) => handleCheckboxChange(event, item._id, item.unit_name)} checked={checkedItems[item._id] || false} />
                                <span className="checkmark"></span>
                            </label>
                        )}
                    </td>
                    <td>
                        <Filtersdone unit_id={item._id} rotation={item.filter_rotation} filter_types={filter_types} />
                    </td>
                    <td><p onClick={(event) => toggleClass(event, true, item._id)}>{item.unit_name}</p>
                    </td>
                    <table className='UnitInfoClosed' id={`tbl${item._id}`}>
                        <tr><td align="left">{item.unit_name}</td>
                            <td><button className='DatatableUnitInfoCloseButton' title={'Close info ' + item.unit_name} onClick={(event) => toggleClass(event, true, item._id)}>Close</button></td></tr>
                        <tr><td>Location</td><td>{item.location}</td></tr>
                        <tr><td>Area Served</td><td>{item.area_served}</td></tr>
                        <tr><td>Filter Size</td><td>{item.filter_size}</td></tr>
                        <tr><td>Filter Type</td><td>{item.filter_type}</td></tr>
                        <tr><td>Filter Due Date</td><td>{filterDueDate}</td></tr>
                        <tr><td>Filters Last replaced</td><td>{item.filters_last_changed}</td></tr>
                        <tr><td>Filter Rotation</td><td>{item.filter_rotation}</td></tr>
                        <tr>
                            <td>Belts</td>
                            <td>{item.belts}</td>
                        </tr>
                        <tr key={item._id}>
                            <td>Notes</td>
                            <td>
                                <textarea key={item._id} readOnly={isDisabled} className="notes" onClick={() => { setShowNotes(true); setIsDisabled(!isDisabled) }} onChange={(event) => handleNotesChange(i, event.target.value)} value={notes[i] || ''} ></textarea><br />
                                <button type="button" onClick={() => { updateNotes(item._id, notes[i]) }} style={{ display: showNotes ? "block" : "none" }}>update</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Assigned Too</td>
                            <td>{item.assigned_to}</td>
                        </tr>
                    </table>
                    <td>{item.location}</td>
                    <td>{item.area_served}</td>
                    <td>{item.filter_size}</td>
                    <td>{filterDueDate}</td>
                </tr>
            );
        }
        return rows;
    }


    const [checkedItems, setCheckedItems] = useState(
        ac_units.reduce((acc, unit) => {
            acc[unit._id] = false;
            return acc;
        }, {})
    );

    const handleCheckboxChange = async (event, unit_id, unit_name) => {
        const isChecked = event.target.checked;
        const unitname = getUnitName(unit_id)
        setCheckedItems((prevCheckedItems) => ({ ...prevCheckedItems, [unit_id]: !prevCheckedItems[unit_id], }));
        setShowTasks(true)
        isChecked ? setTheadTop("110px") : setTheadTop("0")
        let thisTask = {
            unit_id: unit_id,
            unit_name: unit_name
        }

        await setTasks((prevTasks) => {
            if (!isChecked) {
                return prevTasks.filter((task) => task.unit_id !== unit_id)
            }
            else {
                return [...prevTasks, thisTask]

            }
        })

    }





    //---------------------------------
    return (
        <div id="datatable">
            <Spinner style={{ width: "50px", height: "50px", backgroundColor:"green", display: Object.keys(ac_units).length > 0 ? "none" : "block" }} animation="border" variant="primary" role="status">
                <span ></span>
            </Spinner>
            <div>
            


            </div>
            <div id="divTasks" ref={refDivTasks} style={{ display: showTasks && tasks.length > 0 ? "grid" : "none", gridTemplateColumns: "1fr .5fr" }}>

                <div style={{ display: "flex" }}>
                    {tasks.map((task) => (

                        <p key={task.task_id} style={{ padding: "15px" }}>{task.unit_name}</p>

                    ))
                    }
                </div>
                <div style={{ display: "flex", marginLeft: "400px" }}>
                    <Button className="btn btn-primary" style={{ height: "fit-content", paddingBottom: "10px" }} onClick={() => submitTasks()}>Submit tasks</Button>
                    <Button className="btn btn-warning" style={{ height: "80px", width: "140px", marginLeft: "20px", color: "white" }} onClick={() => setShowTasks(false)}>Cancel</Button>
                </div>
            </div>
            <table id="tblListEquipment">
                <thead style={{ top: theadTop, position: "sticky", zIndex: "2" }}>
                    <tr>
                        <th>TASKS</th>
                        <th>FILTERS DONE</th>
                        <th style={{ textAlign: "center" }}>UNIT NAME</th>
                        <th>LOCATION</th>
                        <th>AREA SERVED</th>
                        <th>FILTER SIZE</th>
                        <th>DUE</th>
                    </tr>
                </thead>
                <tbody> {renderTableRows()}</tbody>
            </table>
        </div>
    )
}

export default Datatable;
