import React, { useRef, useEffect } from 'react'
import { useReactToPrint } from 'react-to-print';
import { useDispatch, useSelector } from 'react-redux';
import { manageEquipment } from '../thunks/equipmentThunk.js';
import Button from 'react-bootstrap/Button';

const Print = () => {
    const contentRef = useRef(null);
    const reactToPrintFn = useReactToPrint({ 
        contentRef,
        trigger: () => <button>Print</button>,
        pageStyle: () => `
            size: A4 portrait;
            margin: 0.5in;
            -webkit-print-color-adjust: exact;
        `
    });
    
    
    let ac_units = []
    const dispatch = useDispatch()
    const backup_folder = localStorage.getItem("backup_folder")

    const isDateOlderThanToday = (filtersDue) => {
        const today = new Date();
        const filterDate = new Date(filtersDue);
        return filterDate < today;
    }

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
            let filterDueDate = item.filters_due;
            rows.push(
                <tr style={{color:isDateOlderThanToday(item.filters_due) ? "red":"black"}} key={item._id} >
                    <td>{item.unit_name}</td>
                    <td>{item.location}</td>
                    <td>{item.area_served}</td>
                    <td>{item.filter_size}</td>
                    <td>{filterDueDate}</td>
                </tr>
            );
        }
        return rows;
    }
    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", fontSize:"1.5rem", margin:"0 40px"}} ref={contentRef}>
            <Button variant="success" onClick={() => reactToPrintFn()}>Print now</Button>
            <div ref={contentRef}>
                <table style={{width:"100%"}}>
                    <tr>
                        <th>Unit Name</th>
                        <th>Location</th>
                        <th>Area Served</th>
                        <th>Filter Size</th>
                        <th>Filters Due</th>
                    </tr>
                {renderTableRows()}
                </table>
            </div>
        </div>
        
    );
};

export default Print;