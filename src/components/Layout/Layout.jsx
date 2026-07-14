import { Container } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { AppBar } from '../AppBar/AppBar'

export const Layout = () => (
  <>
    <AppBar />
    <Container component="main" maxWidth="md" sx={{ py: { xs: 3, sm: 5 } }}>
      <Outlet />
    </Container>
  </>
)
