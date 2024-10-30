import { Navigate} from 'react-router-dom'

const ProtectedRoute = ({children}) => {
  const token = localStorage.getItem('token')

  if (!token) {
    // Redirigir a la página de inicio de sesión si no hay token
    return <Navigate to="/login" replace />
  }
  return children;
}

export default ProtectedRoute
