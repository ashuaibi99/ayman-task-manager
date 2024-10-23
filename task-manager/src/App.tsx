/* eslint-disable react/react-in-jsx-scope */
import './App.css'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ThemeProvider } from '@/components/ui/theme-provider'
import { Task, columns } from './columns'
import { useState, useEffect } from 'react'
import { DataTable } from './data-table'
import { Header } from './header.tsx'
import { toast, Toaster } from 'react-hot-toast'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Contact } from './ContactUs.tsx'

async function getData(): Promise<Task[]> {
    return []
}

function App() {
    const [data, setData] = useState<Task[]>([])
    const [newTask, setNewTask] = useState('')

    useEffect(() => {
        async function fetchData() {
            const tasksData = await getData()
            setData(tasksData)
        }
        fetchData()
    }, [])

    function handleInput(event: { target: { value: string } }) {
        setNewTask(event.target.value)
    }

    function handleDelete(id: number) {
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
        <ThemeProvider defaultTheme="dark">
            <Header />
            <Toaster position="top-center" reverseOrder={false} />
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
        </ThemeProvider>
    )
}

export default App
