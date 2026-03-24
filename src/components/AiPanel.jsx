import { useState } from 'react'
import { Box, Button, Typography, Drawer,
  CircularProgress, Divider, IconButton
} from '@mui/material'
import { MdAutoAwesome, MdClose } from 'react-icons/md'
import { supabase } from '../supabaseClient'

const AiPanel = ({ tasks }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [suggestion, setSuggestion] = useState('')

  const handlePrioritize = async () => {
    if (tasks.length === 0) return
    setLoading(true)
    setSuggestion('')
    setOpen(true)

    const { data: { session } } = await supabase.auth.getSession()
    const res = await fetch('http://localhost:5000/api/ai/prioritize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`
      },
      body: JSON.stringify({ tasks })
    })

    const data = await res.json()
    setSuggestion(data.suggestion || data.error)
    setLoading(false)
  }

  return (
    <>
      <Button
        startIcon={<MdAutoAwesome />}
        onClick={handlePrioritize}
        variant="contained"
        disabled={tasks.length === 0}
        sx={{
          textTransform: 'none',
          backgroundColor: '#7c3aed',
          '&:hover': { backgroundColor: '#6d28d9' }
        }}
      >
        Prioritize with AI
      </Button>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 380, p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>

          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
              <MdAutoAwesome color="#7c3aed" /> AI Suggestions
            </Typography>
            <IconButton onClick={() => setOpen(false)}>
              <MdClose />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Content */}
          {loading ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 6, gap: 2 }}>
              <CircularProgress sx={{ color: '#7c3aed' }} />
              <Typography sx={{ color: 'gray', fontSize: '14px' }}>Analyzing your tasks...</Typography>
            </Box>
          ) : (
            <Typography sx={{
              fontSize: '14px',
              lineHeight: 1.8,
              color: '#333',
              whiteSpace: 'pre-wrap'
            }}>
              {suggestion}
            </Typography>
          )}

          {/* Re-run button */}
          {!loading && suggestion && (
            <Button
              startIcon={<MdAutoAwesome />}
              onClick={handlePrioritize}
              variant="outlined"
              sx={{ mt: 'auto', textTransform: 'none', color: '#7c3aed', borderColor: '#7c3aed' }}
            >
              Re-analyze
            </Button>
          )}
        </Box>
      </Drawer>
    </>
  )
}

export default AiPanel;