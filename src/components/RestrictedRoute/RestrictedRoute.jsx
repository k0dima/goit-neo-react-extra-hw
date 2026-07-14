import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../../redux/auth/selectors'

export const RestrictedRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  return isLoggedIn ? <Navigate replace to="/contacts" /> : children
}
