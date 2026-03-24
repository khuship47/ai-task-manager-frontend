import { useState } from 'react'
import { Box, Typography, Button, List, ListItemButton, DialogContent, DialogActions,
  ListItemText, IconButton, Dialog, DialogTitle,TextField, CircularProgress, Tooltip
} from '@mui/material'
import { MdAdd, MdDelete } from "react-icons/md";
import { HiOutlineBars3 } from "react-icons/hi2";


const Sidebar = ({ categories, isLoading, selectedCategory, onSelectCategory, onAddCategory, onDeleteCategory, onUpdateCategory }) => {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [color, setColor] = useState('#6366f1')
  const [isEditing, setIsEditing] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const handleAdd = () => {
    if (!name.trim()) return
    if (isEditing) {
      onUpdateCategory({
        id: editingCategory.id,
        name,
        color
      })
    } else {
      onAddCategory({ name, color })
    }
    setName('')
    setColor('#6366f1')
    setEditingCategory(null)
    setIsEditing(false)
    setOpen(false)
  }

  if (categories.isPending) {
    return (
      <CircularProgress size={24} sx={{ mt: 2, color: '#6366f1' }} />
    )
  }

  const handleEdit = (category) => {
    setName(category.name)
    setColor(category.color)
    setEditingCategory(category) 
    setIsEditing(true)
    setOpen(true)
  }

  return (
    <Box sx={{
      width: isSidebarOpen ? 260 : 50,   // 👈 collapsed width instead of 0
      overflow: 'hidden',
      transition: 'width 0.3s ease',
      minHeight: 'calc(100vh - 64px)',
      borderRight: '1px solid #e0e0e0',
      backgroundColor: '#fafafa',
      display: 'flex',
      flexDirection: 'column',
      p: 1
    }}>
      {/* Top: hamburger (+ title when open) */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: isSidebarOpen ? 'space-between' : 'center', mb: 1 }}>
        {isSidebarOpen && (
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#333', ml: 1 }}>
            Categories
          </Typography>
        )}
        <IconButton size="small" onClick={() => setIsSidebarOpen(!isSidebarOpen)} sx={{ color: '#333' }}>
          <HiOutlineBars3 size={20} />
        </IconButton>
      </Box>

      {isSidebarOpen && (
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
                <ListItemText 
                  onDoubleClick={(e) => {
                    e.preventDefault();
                    handleEdit(cat);
                  }} 
                  primary={cat.name.toUpperCase()} 
                />
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
      )}

      <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'center' }}>
        {isSidebarOpen ? (
          <Button
            startIcon={<MdAdd />}
            onClick={() => {
              setIsEditing(false)
              setEditingCategory(null)
              setName('')
              setColor('#6366f1')
              setOpen(true)
            }}
            sx={{ textTransform: 'none' }}
            variant="outlined"
            fullWidth
          >
            Add Category
          </Button>
        ) : (
          <Tooltip title="Add Category" placement="right">
            <IconButton
              onClick={() => {
                setIsEditing(false)
                setEditingCategory(null)
                setName('')
                setColor('#6366f1')
                setOpen(true)
              }}
              sx={{ color: '#6366f1' }}
            >
              <MdAdd size={22} />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      {/* Add Category Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>{isEditing ? 'Edit Category' : 'New Category'}</DialogTitle>
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
          <Button onClick={handleAdd} variant="contained" disabled={!name}>
            {isEditing ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}


export default Sidebar; 