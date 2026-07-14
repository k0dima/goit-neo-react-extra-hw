import toast from 'react-hot-toast'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { Link, Paper, Stack, Typography } from '@mui/material'
import { AuthForm } from '../components/AuthForm/AuthForm'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../redux/auth/operations'
import { selectIsAuthLoading } from '../redux/auth/selectors'

export const RegisterPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoading = useSelector(selectIsAuthLoading)

  const handleSubmit = async ({ name, email, password }) => {
    try {
      await dispatch(register({ name, email, password })).unwrap()
      toast.success('Account created.')
      navigate('/contacts')
    } catch (error) {
      toast.error(String(error))
    }
  }

  return (
    <Paper elevation={2} sx={{ margin: 'auto', maxWidth: 480, p: 3 }}>
      <Stack spacing={2}>
        <Typography component="h1" variant="h4">Create account</Typography>
        <AuthForm isLoading={isLoading} mode="register" onSubmit={handleSubmit} />
        <Typography color="text.secondary" variant="body2">
          Already registered? <Link component={RouterLink} to="/login">Log in</Link>.
        </Typography>
      </Stack>
    </Paper>
  )
}
