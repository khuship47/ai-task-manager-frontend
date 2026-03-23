import { Card, CardContent, Typography, Chip, IconButton, Box } from '@mui/material'
import { MdDelete } from 'react-icons/md'

const priorityColors = {
  low: { bg: '#e8f5e9', color: '#2e7d32' },
  medium: { bg: '#fff8e1', color: '#f57f17' },
  high: { bg: '#ffebee', color: '#c62828' }
}

const statusColors = {
  todo: { bg: '#e3f2fd', color: '#1565c0' },
  in_progress: { bg: '#fff3e0', color: '#e65100' },
  done: { bg: '#e8f5e9', color: '#2e7d32' }
}

const statusLabels = {
  todo: 'To-Do',
  in_progress: 'In Progress',
  done: 'Done'
}

export default function TaskCard({ task, onDelete }) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        transition: '0.2s',
        '&:hover': {
          boxShadow: 4,
          transform: 'translateY(-2px)'
        }
      }}
    >
      <CardContent sx={{ p: 2 }}>
        
        {/* Top row */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Typography sx={{ fontWeight: 600, fontSize: '15px' }}>
            {task.title}
          </Typography>
          <IconButton size="small" onClick={() => onDelete(task.id)}>
            <MdDelete size={18} color="#999" />
          </IconButton>
        </Box>

        {/* Description */}
        {task.description && (
          <Typography sx={{ fontSize: '13px', color: 'gray', mt: 0.5 }}>
            {task.description}
          </Typography>
        )}

        {/* Chips */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
          <Chip
            label={task.priority}
            size="small"
            sx={{
              backgroundColor: priorityColors[task.priority]?.bg,
              color: priorityColors[task.priority]?.color,
              fontWeight: 600,
              fontSize: '11px'
            }}
          />
          <Chip
            label={statusLabels[task.status]}
            size="small"
            sx={{
              backgroundColor: statusColors[task.status]?.bg,
              color: statusColors[task.status]?.color,
              fontSize: '11px'
            }}
          />
          {task.due_date && (
            <Chip
              label={`Due: ${new Date(task.due_date).toLocaleDateString()}`}
              size="small"
              sx={{ backgroundColor: '#f5f5f5', fontSize: '11px' }}
            />
          )}
        </Box>

      </CardContent>
    </Card>
  )
}