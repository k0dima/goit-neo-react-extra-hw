import { Box, CircularProgress, Typography } from '@mui/material'

export const Loader = ({ label = 'Loading…' }) => (
  <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', gap: 2, py: 6 }}>
    <CircularProgress aria-label={label} />
    <Typography color="text.secondary">{label}</Typography>
  </Box>
)
