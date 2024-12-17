import React, {useEffect, useRef, useState} from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'
import CloseButton from 'react-bootstrap/CloseButton';
import { useDispatch, useSelector } from 'react-redux';
import { manageUser } from '../thunks/usersThunk'
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Admin = () =>{
    const Style ={
        centered:{
            textAlign:'center'
        },
        td:{
            width:'600px'
        },
        boxshadow: { 
            boxShadow: '2px 2px 12px rgba(0, 0, 0, 0.1)' 
        },
        NavLink:{
            fontSize:'2em',
            color:'rgb(173, 136, 251)',
            fontWeight:'bold'
        }
    }

    const [showAddModal, setShowAddModal] = useState(false)

    const refEditID = useRef(null)
    const refUserName = useRef(null)
    const refPassword = useRef(null)
    const refEmail = useRef(null)
    const refIsAdmin = useRef(null)
    const refEditUserName = useRef(null)
    const refEditPassword = useRef(null)
    const refEditEmail = useRef(null)
    const refEditAdmin = useRef(null)
    const refUsersTable = useRef(null)
    const [editID, setEditID] = useState('')
    const [editAdmin, setEditAdmin] = useState('')
    const [editUsername, setEditUsername] = useState('')
    const [editPassword, setEditPassword] = useState('')
    const [editEmail, setEditEmail] = useState('')
    const [adminChecked, setAdminChecked] = useState(false)
    const dispatch = useDispatch()
    const backupFolder = useSelector((state) => state.userData)
    const backup_folder =  backupFolder['backup_folder']
    const [haveUsers, setHaveUsers] = useState(false)
    //console.log(backup_folder.hasOwnProperty('backup_folder'))
    //console.log("from Admin.jsx backup_folder="+ backup_folder)
     const [users, setUsers] = useState([])
    useEffect(() => { 
        document.title = "FM - Admin" 
        return () => { 
            document.title = "My React App"; 
        }
        }, []);

        //-----GET ALL USERS----------------

            // const allusers = useSelector((state)=> state.users.users)

            // console.log(allusers)
            // useEffect(()=>{
            //     if(haveUsers === false){setUsers(allusers)}
            // }, [allusers])
            // setHaveUsers(true)
        
             
            // console.log("from Admin: allusers="+ users)


    const addNewUser = () =>{
        // const admin = refEditIsAdmin.checked ? "true":"false"
        // const obj = {
        //     id=refEditID,
        //     username:refEditUserName.current.value,
        //     email:refEditEmail.current.value,
        //     password:refEditPassword.current.value,
        //     admin:admin,
        //     action:"add-user"
        // }
    }

    const updateUser = () =>{
        console.log("updateUser------------------------")
        if (refEditID.current && refEditUserName.current && refEditPassword.current && refEditEmail.current && refEditAdmin.current) {
        const checked = editAdmin ? "yes":"no"
        const obj={
            action:"edit-user",
            id:refEditID.current.value,
            backup_folder:backup_folder,
            username:refEditUserName.current.value,
            password:refEditPassword.current.value,
            email:refEditEmail.current.value,
            admin:checked
        }
        dispatch(manageUser(obj))
    }
    }

    const editUser = (rowIndex) => 
        { 
            console.log("editUser......................................")
            const x = rowIndex + 1
            let table; 
            //setShowEditModal(true)
            if (refUsersTable.current) 
                { 
                    table = refUsersTable.current; 
                    if (table && table.rows[x]) { 
                        const row = table.rows[x]; 
                        const cells = Array.from(row.cells); 
                        cells.map((cell, index) => { 
                            switch (index) { 
                                case 0:
                                setEditID(cell.textContent)
                                break
                                case 1: 
                                setEditUsername(cell.textContent);
                                break; 
                                case 2:
                                setEditPassword(cell.textContent)
                                break
                                case 3:
                                setEditEmail(cell.textContent)
                                break
                                case 4:
                                    if(cell.textContent === "yes"){
                                        setEditAdmin(true)
                                    }else{
                                        setEditAdmin(false)
                                    }
                                    break;
                            }
                        })
                    }   
                } 
        }

    return (
    <div style={{display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", width:"100%"}}>
        <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link style={Style.NavLink} onClick={()=>setShowAddModal(true)}>Add user</Nav.Link>
            <Nav.Link style={Style.NavLink} href="#">User list</Nav.Link>
       
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        <div
      className="modal show"
      style={{ display: 'block', position: 'initial', width:"1500px", margin:"0 auto", border:"4px solid green"}}
    >
      <Modal.Dialog style={{width:"10000px"}}>
        <Modal.Header style={{width:"100%"}} closeButton>
          <Modal.Title>Edit user</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{width:"100%"}}>
        <Table bordered hover style={{width:"1400px"}}>
                <thead >
                </thead>
                <tbody>
                    <tr>
                    <td><input type="text" ref={refEditID} value={editID} onChange={(event)=>setEditID(event.target.value)} style={{width:"20px", height:"20px"}} /></td>
                        <td style={Style.td} >
                        <>
                        <FloatingLabel controlId="editusername" label="User name" className="mb-3" style={Style.boxshadow} >
                            <Form.Control ref={refEditUserName} onChange={(event)=>setEditUsername(event.target.value)} type="text" placeholder="" value={editUsername} />
                        </FloatingLabel>
                        </>
                        </td>
                        <td style={Style.td} >
                        <FloatingLabel controlId="editfloatingPassword" label="Password" style={Style.boxshadow} >
                            <Form.Control ref={refEditPassword} onChange={(event)=>setEditPassword(event.target.value)} 
                            value={editPassword} type="text" placeholder="Password" />
                        </FloatingLabel>
                        </td>
     
                        <td style={Style.td} >
                            <FloatingLabel controlId="editemail" label="Email">
                            <Form.Control ref={refEditEmail} onChange={(event)=>setEditEmail(event.target.value)} type="email" placeholder="Email" style={Style.boxshadow} value={editEmail} />
                            </FloatingLabel>
                        </td>
                        <td style={Style.td} >
                            <div style={{backgroundColor:"white", borderRadius:"8px",height:"100%", padding:"0 10px 0 20px", ...Style.boxshadow}} >
                            Admin can add, delete or edit users.
                        <Form.Switch // prettier-ignore
                            type="switch"
                            id="isadmin"
                            label="Make admin"
                            checked={editAdmin}
                            ref={refEditAdmin}
                            onChange={(event)=>setEditAdmin(event.target.checked)}
                        />
                        </div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3} style={Style.td} >
                           <div style={{marginLeft:"500px", display:"flex", gap:"40px"}}>
                        <Button stye={{marginLeft:"20px"}} variant="primary" >Save changes</Button>
                        </div> 
                        </td>
                        <td></td>
                        <td></td>
                    </tr>
                    </tbody>
                </Table>
        </Modal.Body>

        <Modal.Footer>
          
        </Modal.Footer>
      </Modal.Dialog>
    </div>
        <div>
          
            <Table bordered hover style={{margin:"0 auto"}} >
                <thead >
                    <tr >
                        <th colSpan={2} style={{textAlign:"center"}}>ADD NEW USER</th>
                       
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={Style.td} >
                        <>
                        <FloatingLabel controlId="username" label="User name" className="mb-3" style={Style.boxshadow} >
                            <Form.Control ref={refUserName} type="text" placeholder="" />
                        </FloatingLabel>
                        </>
                        </td>
                        <td style={Style.td} >
                        <FloatingLabel controlId="floatingPassword" label="Password" style={Style.boxshadow} >
                            <Form.Control ref={refPassword} type="text" placeholder="Password" />
                        </FloatingLabel>
                        </td>
                    </tr>
                    <tr>
                        <td style={Style.td} >
                            <FloatingLabel controlId="email" label="Email">
                            <Form.Control ref={refEmail} type="email" placeholder="PEmail" style={Style.boxshadow} />
                            </FloatingLabel>
                        </td>
                        <td style={Style.td} ><div style={{backgroundColor:"white", borderRadius:"8px",height:"70px", padding:"0 10px 0 20px", ...Style.boxshadow}} ><span>Admin can add, delete or edit users.</span>
                        <Form.Switch // prettier-ignore
                            type="switch"
                            id="isadmin"
                            label="Make admin"
                            ref={refIsAdmin}
                        />
                        </div>
                        </td>
                    </tr>
                    </tbody>
                </Table>
                <div  style={{display:"flex", alignItems:"center", margin:"20px"}}>
                    <Button variant="outline-primary" style={{margin:"0 auto",...Style.boxshadow}}>Submit</Button>
                    <Button variant="outline-dark" style={Style.boxshadow} onClick={()=>setShowAddModal(false)}>Cancel</Button>
                </div>
        </div>


    </div>                              

    )
}
export default Admin