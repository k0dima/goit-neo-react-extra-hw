import { Button, Paper, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../redux/auth/selectors'

export const HomePage = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn)

  return (
    <Paper elevation={2} sx={{ p: { xs: 3, sm: 5 } }}>
      <Stack spacing={2}>
        <Typography component="h1" variant="h3">Your contacts, in one place.</Typography>
        <Typography color="text.secondary">
          Keep a personal phonebook with secure authentication, search, and contact management.
        </Typography>
        <Button component={RouterLink} sx={{ alignSelf: 'start' }} to={isLoggedIn ? '/contacts' : '/register'} variant="contained">
          {isLoggedIn ? 'Open contacts' : 'Create account'}
        </Button>
      </Stack>
    </Paper>
  )
}
