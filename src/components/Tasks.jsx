import { useState } from 'react'
import {
  Box, Typography, Button, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField, Select, MenuItem
} from '@mui/material'
import { supabase } from '../supabaseClient'

export default function Tasks({ open, setOpen, selectedCategory, onTaskAdded }) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('todo')
    const [priority, setPriority] = useState('medium')
    const [dueDate, setDueDate] = useState('')

    const handleAdd = async () => {
        if (!title.trim()) return

        const { data: { session } } = await supabase.auth.getSession()
        const res = await fetch('http://localhost:5000/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session.access_token}`
            },
            body: JSON.stringify({
                title,
                description,
                status,
                priority,
                due_date: dueDate,
                category_id: selectedCategory?.id
            })
        })

        const newTask = await res.json()
        onTaskAdded(newTask)

        // Reset fields
        setTitle('')
        setDescription('')
        setStatus('todo')
        setPriority('medium')
        setDueDate('')
        setOpen(false)
    }

    return (
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
            <DialogTitle>New Task</DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
                <Box>
                    <Typography sx={{ fontSize: '14px', mb: 0.5, color: 'gray' }}>Title</Typography>
                    <TextField
                        placeholder="Task title"
                        fullWidth size="small"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Box>

                <Box>
                    <Typography sx={{ fontSize: '14px', mb: 0.5, color: 'gray' }}>Description</Typography>
                    <TextField
                        placeholder="Task description"
                        fullWidth size="small" multiline rows={2}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Box>

                <Box>
                    <Typography sx={{ fontSize: '14px', mb: 0.5, color: 'gray' }}>Status</Typography>
                    <Select fullWidth size="small" value={status} onChange={(e) => setStatus(e.target.value)}>
                        <MenuItem value="todo">To-Do</MenuItem>
                        <MenuItem value="in_progress">In Progress</MenuItem>
                        <MenuItem value="done">Done</MenuItem>
                    </Select>
                </Box>

                <Box>
                    <Typography sx={{ fontSize: '14px', mb: 0.5, color: 'gray' }}>Priority</Typography>
                    <Select fullWidth size="small" value={priority} onChange={(e) => setPriority(e.target.value)}>
                        <MenuItem value="low">Low</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="high">High</MenuItem>
                    </Select>
                </Box>

                <Box>
                    <Typography sx={{ fontSize: '14px', mb: 0.5, color: 'gray' }}>Due Date</Typography>
                    <TextField
                        fullWidth size="small" type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={handleAdd} variant="contained">Add</Button>
            </DialogActions>
        </Dialog>
    )
}