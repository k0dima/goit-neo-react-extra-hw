import { useEffect, useRef } from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import toast, { Toaster } from 'react-hot-toast'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout/Layout'
import { Loader } from './components/Loader/Loader'
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute'
import { RestrictedRoute } from './components/RestrictedRoute/RestrictedRoute'
import { useDispatch, useSelector } from 'react-redux'
import { refreshCurrentUser } from './redux/auth/operations'
import { selectIsRefreshing, selectToken, selectUser } from './redux/auth/selectors'
import { ContactsPage } from './pages/ContactsPage'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { theme } from './theme'

function App() {
  const dispatch = useDispatch()
  const token = useSelector(selectToken)
  const user = useSelector(selectUser)
  const isRefreshing = useSelector(selectIsRefreshing)
  const refreshStarted = useRef(false)

  useEffect(() => {
    if (!token) {
      refreshStarted.current = false
      return
    }

    if (user || refreshStarted.current) {
      return
    }

    refreshStarted.current = true
    dispatch(refreshCurrentUser())
      .unwrap()
      .catch(() => toast.error('Your session has expired. Please log in again.'))
  }, [dispatch, token, user])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {token && (!user || isRefreshing) ? (
        <Loader label="Restoring your session…" />
      ) : (
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route element={<PrivateRoute><ContactsPage /></PrivateRoute>} path="contacts" />
            <Route element={<RestrictedRoute><LoginPage /></RestrictedRoute>} path="login" />
            <Route element={<RestrictedRoute><RegisterPage /></RestrictedRoute>} path="register" />
            <Route element={<Navigate replace to="/" />} path="*" />
          </Route>
        </Routes>
      )}
      <Toaster position="bottom-center" toastOptions={{ duration: 4000 }} />
    </ThemeProvider>
  )
}

export default App
