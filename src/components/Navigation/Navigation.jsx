import { Button, Stack } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../../redux/auth/selectors'

export const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn)

  return (
    <Stack direction="row" spacing={1}>
      <Button color="inherit" component={NavLink} to="/">
        Home
      </Button>
      {isLoggedIn ? (
        <Button color="inherit" component={NavLink} to="/contacts">
          Contacts
        </Button>
      ) : (
        <>
          <Button color="inherit" component={NavLink} to="/register">
            Register
          </Button>
          <Button color="inherit" component={NavLink} to="/login">
            Log in
          </Button>
        </>
      )}
    </Stack>
  )
}
