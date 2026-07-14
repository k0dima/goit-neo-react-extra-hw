import LogoutIcon from '@mui/icons-material/Logout'
import { AppBar as MuiAppBar, Button, Stack, Toolbar, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../../redux/auth/operations'
import { selectIsLoggedIn, selectUser } from '../../redux/auth/selectors'
import { Navigation } from '../Navigation/Navigation'

export const AppBar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const user = useSelector(selectUser)

  const handleLogout = async () => {
    try {
      await dispatch(logOut()).unwrap()
      navigate('/')
      toast.success('You are logged out.')
    } catch (error) {
      navigate('/')
      toast.error(`Session ended locally: ${String(error)}`)
    }
  }

  return (
    <MuiAppBar position="static">
      <Toolbar sx={{ gap: 1, justifyContent: 'space-between' }}>
        <Typography component="span" sx={{ fontWeight: 700 }} variant="h6">
          Phonebook
        </Typography>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Navigation />
          {isLoggedIn && (
            <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>
              {user?.name}
            </Button>
          )}
        </Stack>
      </Toolbar>
    </MuiAppBar>
  )
}
