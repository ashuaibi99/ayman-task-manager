import './App.css'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ThemeProvider } from "@/components/ui/theme-provider"
import { Task, columns } from "./columns"
import { useState, useEffect } from 'react'
import { DataTable } from "./data-table"


// TODO: Combobox instead of status box, and then a deletion tab.


async function getData(): Promise<Task[]> {
  return [
    {
      id: 1,
      task: "Walk the bubby then take out the trash",
      status: "",
      dateCreated: "10/18/2024",
    },
  ]
}


function App() {

  const [data, setData] = useState<Task[]>([])
  const [newTask, setNewTask] = useState("")


  useEffect(() => {
    async function fetchData(){
      const tasksData = await getData()
      setData(tasksData)
    }
    fetchData()
  }, [])

  function handleInput(event: { target: { value: string } }){
    setNewTask(event.target.value)
  }

  function getDate(){
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); 
    const yyyy = today.getFullYear();
    today =  mm + '/' + dd + '/' + yyyy;
    return today
    
  }

  function addTask(){
    const generateTask: Task =
    {
      id: data.length + 1,
      task: newTask,
      status: "unchecked",
      dateCreated: getDate().toString()
    }
    setData([...data, generateTask]);
    setNewTask("")
  }

  return (
    <ThemeProvider defaultTheme="dark">
      <div className="flex-col items-center h-screen mt-32">
        <div className="flex bg-zinc dark w-500"  >
          <Input className="mr-10" type="text" value={newTask} onChange={handleInput} placeholder="Enter Your Task!" />
          <Button variant="outline" onClick={addTask}> Add Task </Button> 
        </div>
        <div className="flex-col mt-10">
          {data.length > 0 ? <DataTable columns={columns} data={data} /> : <p>Loading...</p>}
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
