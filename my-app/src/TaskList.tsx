import React, {useState} from 'react'

function TaskList(){
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");


    return (<div className="task-list"> 
    <h1> Task Manager List</h1>
    </div>);
}

export default TaskList