import toast from 'react-hot-toast'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { Link, Paper, Stack, Typography } from '@mui/material'
import { AuthForm } from '../components/AuthForm/AuthForm'
import { useDispatch, useSelector } from 'react-redux'
import { logIn } from '../redux/auth/operations'
import { selectIsAuthLoading } from '../redux/auth/selectors'

export const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoading = useSelector(selectIsAuthLoading)

  const handleSubmit = async ({ email, password }) => {
    try {
      await dispatch(logIn({ email, password })).unwrap()
      toast.success('Welcome back!')
      navigate('/contacts')
    } catch (error) {
      toast.error(String(error))
    }
  }

  return (
    <Paper elevation={2} sx={{ margin: 'auto', maxWidth: 480, p: 3 }}>
      <Stack spacing={2}>
        <Typography component="h1" variant="h4">Log in</Typography>
        <AuthForm isLoading={isLoading} mode="login" onSubmit={handleSubmit} />
        <Typography color="text.secondary" variant="body2">
          No account? <Link component={RouterLink} to="/register">Register now</Link>.
        </Typography>
      </Stack>
    </Paper>
  )
}
