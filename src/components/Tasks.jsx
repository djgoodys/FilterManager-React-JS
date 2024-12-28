import React, { useEffect, useState } from "react"
import img_cancel from "../images/cancel.png"
import dwcheckyes from "../images/dwcheckyes.png"
import { manageTasks } from "../thunks/tasksThunk"
import { useDispatch, useSelector } from "react-redux";


const Tasks = () => {
    const dispatch = useDispatch()
    const [tasks, setTasks] = useState([])
    const backup_folder = localStorage.getItem("backup_folder")
    const Style = {
        img_cancel: {
            width: '30px',
            height: '30px'
        },
        td: {
            textAlign: 'center',
            padding: '15px 15px 15px 15px',
            fontSize: '1em'
        },
        th: {
            textAlign: 'center',
            fontSize: '1em'
        }
    }

    const fetchTasks = async () => {
        const username = localStorage.getItem("username")
        const obj = {
            action: "get-all-tasks",
            backup_folder: backup_folder,
            username: username
        }
        const response = await dispatch(manageTasks(obj))
    }
    useEffect(() => {
        fetchTasks()
    }, [dispatch])
    const tasksArray = useSelector((state) => state.tasks.tasks)
    useEffect(() => {
        setTasks(tasksArray)
    }, [tasksArray])

    const completeTask = async (id, rotation, filter_type) => {
        const username = localStorage.getItem("username")
        const obj = {
            action: "complete-task",
            backup_folder: backup_folder,
            unit_id: id,
            username: username,
            rotation: rotation,
            filter_type: filter_type
        }
        const response = await dispatch(manageTasks(obj))
    }

    const cancelTask = async (id) => {
        const username = localStorage.getItem("username")
        const obj = {
            action: "cancel-task",
            backup_folder: backup_folder,
            unit_id: id,
            username: username
        }
        const response = await dispatch(manageTasks(obj))
    }

    return (
        <div style={{ marginTop: "40px", display: "flex", justifyContent: "center" }}>
            <table id="tblTasks">
                <thead>
                    <tr>
                        <th style={Style.th}>Cancel task</th>
                        <th style={Style.th}>Unit name</th>
                        <th style={Style.th}>Unit location</th>
                        <th style={Style.th}>Filter size</th>
                        <th style={Style.th}>Filter type</th>
                        <th style={Style.th}>Complete task</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task, index) =>
                    (<tr key={index}>
                        <td style={Style.td}><img src={img_cancel} style={Style.img_cancel} onClick={() => cancelTask(task._id)} /></td>
                        <td style={Style.td}>{task.unit_name}</td>
                        <td style={Style.td}>{task.location}</td>
                        <td style={Style.td}>{task.filter_size}</td>
                        <td style={Style.td}>{task.filter_type}</td>
                        <td style={Style.td}><img style={Style.img_cancel} src={dwcheckyes} onClick={() => completeTask(task._id, task.filter_rotation, task.filter_type)} /></td>
                    </tr>)
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Tasks