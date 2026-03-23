import { useState } from 'react'
import {
  Box, Typography, Button, List, ListItemButton, DialogContent, DialogActions,
  ListItemText, IconButton, Dialog, DialogTitle,TextField, CircularProgress
} from '@mui/material'
import { MdAdd, MdDelete } from "react-icons/md";

export default function Sidebar({ categories, isLoading, selectedCategory, onSelectCategory, onAddCategory, onDeleteCategory }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [color, setColor] = useState('#6366f1')

  const handleAdd = () => {
    if (!name.trim()) return
    onAddCategory({ name, color })
    setName('')
    setColor('#6366f1')
    setOpen(false)
  }

  if (categories.isPending) {
    return (
      <CircularProgress size={24} sx={{ mt: 2, color: '#6366f1' }} />
    )
  }

  return (
    <Box sx={{
      width: 260,
      minHeight: 'calc(100vh - 64px)',
      borderRight: '1px solid #e0e0e0',
      backgroundColor: '#fafafa',
      display: 'flex',
      flexDirection: 'column',
      p: 2
    }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: '#333' }}>
        Categories
      </Typography>

      <List dense>
        {isLoading ? (
          <CircularProgress size={24} sx={{ mt: 2, color: '#6366f1' }} />
        ) : (
          <>
          {categories.map((cat) => (
            <ListItemButton
              key={cat.id}
              selected={selectedCategory?.id === cat.id}
              onClick={() => onSelectCategory(cat)}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                '&.Mui-selected': {
                  backgroundColor: cat.color + '22',
                  borderLeft: `4px solid ${cat.color}`,
                }
              }}
            >
              <Box
                sx={{
                  width: 10, height: 10,
                  borderRadius: '50%',
                  backgroundColor: cat.color,
                  mr: 1.5, flexShrink: 0
                }}
              />
              <ListItemText primary={cat.name} />
              <IconButton
                size="small"
                onClick={(e) => { e.stopPropagation(); onDeleteCategory(cat.id) }}
              >
                <MdDelete fontSize="small" />
              </IconButton>
            </ListItemButton>
          ))}
          </>
        )}
      </List>

      <Button
        startIcon={<MdAdd />}
        onClick={() => setOpen(true)}
        sx={{ mt: 'auto', textTransform: 'none' }}
        variant="outlined"
        fullWidth
      >
        Add Category
      </Button>

      {/* Add Category Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>New Category</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <Box>
                <Typography sx={{ fontSize: '14px', mb: 0.5, color: 'gray' }}>Category Name</Typography>
                <TextField
                    placeholder='Enter New Category'
                    fullWidth
                    size="small"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </Box>
          <Box>
            <Typography sx={{ fontSize: '14px', mb: 0.5, color: 'gray' }}>Color</Typography>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              style={{ width: '100%', height: 40, cursor: 'pointer', border: 'none' }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAdd} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}