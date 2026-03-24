import { useState, useEffect } from 'react'
import { Box, Typography, Button, CircularProgress } from '@mui/material'
import { supabase } from '../supabaseClient'
import Sidebar from '../components/SideBar'
import Tasks from '../components/Tasks'
import { MdAdd } from "react-icons/md";
import TaskCard from '../components/TaskCard'
import AiPanel from '../components/AiPanel'

const Home = () => {
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [open, setOpen] = useState(false)
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isTasksLoading, setIsTasksLoading] = useState(false)


  const handleTaskAdded = (newTask) => {
    setTasks([newTask, ...tasks])
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
      if (selectedCategory) fetchTasks()
      else  setTasks([])
    }, [selectedCategory])

  const fetchCategories = async () => {
    setIsLoading(true)
    const { data: { session } } = await supabase.auth.getSession()
    const res = await fetch('http://localhost:5000/api/categories', {
      headers: { Authorization: `Bearer ${session.access_token}` }
    })
    const data = await res.json()
    setCategories(data)
    setIsLoading(false)
  }

  const fetchTasks = async () => {
    setIsTasksLoading(true)
    const { data: { session } } = await supabase.auth.getSession()
    const res = await fetch('http://localhost:5000/api/tasks?category_id=' + selectedCategory?.id, {
      headers: { Authorization: `Bearer ${session.access_token}` }
    })
    const data = await res.json()
    setTasks(data)
    setIsTasksLoading(false)
  }

  const handleAddCategory = async (category) => {
    const { data: { session } } = await supabase.auth.getSession()
    const res = await fetch('http://localhost:5000/api/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`
      },
      body: JSON.stringify(category)
    })
    const newCat = await res.json()
    setCategories([...categories, newCat])
  }

  const handleUpdateCategory = async (category) => {
    const { data: { session } } = await supabase.auth.getSession()

    const res = await fetch(`http://localhost:5000/api/categories/${category.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`
      },
      body: JSON.stringify(category)
    })

    const updatedCat = await res.json()

    // update UI properly
    setCategories(categories.map(c =>
      c.id === updatedCat.id ? updatedCat : c
    ))
    if (selectedCategory?.id === updatedCat.id) {
      setSelectedCategory(updatedCat)
    }
  }

  const handleDeleteCategory = async (id) => {
    const { data: { session } } = await supabase.auth.getSession()
    await fetch(`http://localhost:5000/api/categories/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${session.access_token}` }
    })
    setCategories(categories.filter(c => c.id !== id))
    if (selectedCategory?.id === id) setSelectedCategory(null)
  }

  const handleDeleteTask = async (id) => {
    const { data: { session } } = await supabase.auth.getSession()
    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${session.access_token}` }
    })
    setTasks(tasks.filter(t => t.id !== id))
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar
        categories={categories}
        isLoading={isLoading}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onAddCategory={handleAddCategory}
        onDeleteCategory={handleDeleteCategory}
        onUpdateCategory={handleUpdateCategory}
      />

      {/* Main content area */}
      <Box sx={{ flex: 1, p: 3 }}>
        {selectedCategory ? (
           <>
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {selectedCategory.name.toUpperCase()}
              </Typography>
              <Button
                startIcon={<MdAdd />}
                onClick={() => setOpen(true)}
                variant="outlined"
                sx={{ textTransform: 'none' }}
              >
                Add Task
              </Button>
              <AiPanel tasks={tasks} />
            </Box>

            {/* Task cards */}
            {isTasksLoading ? (
              <CircularProgress />
            ) : tasks.length === 0 ? (
              <Typography sx={{ color: 'gray' }}>
                No tasks yet — add one!
              </Typography>
            ) : (
              <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 300px))',
                gap: 2
              }}>
                {tasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onDelete={handleDeleteTask}
                  />
                ))}
              </Box>
            )}
          </>
        ) : (
          <Typography variant="h6" sx={{ color: 'gray', mt: 4, textAlign: 'center' }}>
            Select a category to view tasks
          </Typography>
        )}
      </Box>

      <Tasks
        open={open}
        setOpen={setOpen}
        selectedCategory={selectedCategory}
        onTaskAdded={handleTaskAdded}
      />
    </Box>
  )
}

export default Home;