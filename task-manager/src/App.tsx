/* eslint-disable react/react-in-jsx-scope */
import './App.css'
import ContactUs from './ContactUs'
import LogIn from './LogIn'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ThemeProvider } from '@/components/ui/theme-provider'
import { Task, columns } from './columns'
import { useState, useEffect } from 'react'
import { DataTable } from './data-table'
import { Header } from './header.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster, toast } from 'sonner'

function TaskManager() {
    const [data, setData] = useState<Task[]>([])
    const [newTask, setNewTask] = useState('')
    const username = localStorage.getItem('user')

    useEffect(() => {
        async function fetchData() {
            if (!username) {
                toast.error('No user found. Please log in.')
                return
            }

            try {
                const response = await fetch(
                    `http://localhost:5050/profile/tasks/${username}`
                )

                if (!response.ok) {
                    throw new Error('Failed to fetch tasks')
                }

                const tasks = await response.json()
                console.log(tasks[0])

                const formattedTasks = tasks.map((task, index) => ({
                    id: index + 1,
                    task: task.task,
                    status: task.status,
                    dateCreated: task.dateCreated,
                }))

                setData(formattedTasks)
            } catch (error) {
                console.error('Error fetching tasks:', error)
                setData([])
            }
        }

        fetchData()
    }, [username])

    function handleInput(event: { target: { value: string } }) {
        setNewTask(event.target.value)
    }

    function handleDelete(id: number) {
        console.log(id)
        const filteredData = data.filter((task) => task.id !== id)
        setData(filteredData)
    }

    function getDate() {
        const today = new Date()
        const dd = String(today.getDate()).padStart(2, '0')
        const mm = String(today.getMonth() + 1).padStart(2, '0')
        const yyyy = today.getFullYear()
        const final = mm + '/' + dd + '/' + yyyy
        return final
    }

    function toastMessage() {
        toast.error('Error: Empty Task!', {
            duration: 2000,
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            },
        })
    }

    function addTask() {
        if (!newTask.trim()) {
            return toastMessage()
        }

        const generateTask: Task = {
            id: data.length + 1,
            task: newTask,
            status: 'backlog',
            dateCreated: getDate().toString(),
        }
        setData([...data, generateTask])
        setNewTask('')
    }

    function handleStatusChange(id: number, newStatus: string) {
        const updatedData = data.map((task) =>
            task.id === id ? { ...task, status: newStatus } : task
        )
        setData(updatedData)
    }

    return (
        <div className="flex-col items-center h-screen mt-32">
            <h1 className="mb-20 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                Personal Task Manager
            </h1>
            <div className="flex bg-zinc dark w-500">
                <Input
                    className="mr-10"
                    type="text"
                    value={newTask}
                    onChange={handleInput}
                    placeholder="Enter Your Task!"
                />
                <Button variant="outline" onClick={addTask}>
                    {' '}
                    Add Task{' '}
                </Button>
            </div>
            <div className="flex-col mt-10">
                {data.length > 0 ? (
                    <DataTable
                        columns={columns(handleDelete, handleStatusChange)}
                        data={data}
                    />
                ) : (
                    <p>No tasks found. Start by adding a task!</p>
                )}
            </div>
        </div>
    )
}

function App() {
    return (
        <BrowserRouter>
            <ThemeProvider defaultTheme="dark">
                <Header />
                <Toaster position="top-center" />
                <Routes>
                    <Route path="/" element={<TaskManager />} />
                    <Route path="/contact" element={<ContactUs />} />
                    <Route path="/login" element={<LogIn />} />
                </Routes>
            </ThemeProvider>
        </BrowserRouter>
    )
}

export default App
