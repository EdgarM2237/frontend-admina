import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
  Alert,
} from "@material-tailwind/react"

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Error en el inicio de sesión')
      }

      const jwtMatch = data.serialized.match(/jwt=([^;]+)/)
      if (jwtMatch && jwtMatch[1]) {
        const token = jwtMatch[1]
        localStorage.setItem('token', token)
        localStorage.setItem('email', email)
        navigate('/verify', { state: { email } })
      } else {
        throw new Error('No se pudo obtener el token de autenticación')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-[24rem] px-4 py-8 sm:px-8">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Iniciar Sesión
          </Typography>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardBody className="flex flex-col gap-4">
            {error && (
              <Alert color="red" variant="gradient">
                {error}
              </Alert>
            )}
            <Input
              type="email"
              label="Email"
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              label="Contraseña"
              size="lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="-ml-2.5">
              <Checkbox
                label="Recordarme"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button type="submit" variant="gradient" fullWidth disabled={isLoading}>
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              ¿Olvidaste tu contraseña?
              <Typography
                as="a"
                href="#"
                variant="small"
                color="blue"
                className="ml-1 font-bold"
              >
                Recuperar
              </Typography>
            </Typography>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
