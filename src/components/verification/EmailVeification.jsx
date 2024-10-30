import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
  Alert,
} from "@material-tailwind/react";
import { ENDOPONT } from "../fetchs/GeneralVariables";

export default function EmailVerification() {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${ENDOPONT}/auth/verify-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error en la verificación");
      }

      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/resend-code",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al reenviar el código");
      }

      alert("Código reenviado con éxito");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!email) {
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-[24rem] px-4 py-8 sm:px-8">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-28 place-items-center px-4 py-5"
        >
          <Typography variant="h3" color="white">
            Verificación de Email
          </Typography>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardBody className="flex flex-col gap-4">
            {error && (
              <Alert color="red" variant="gradient">
                {error}
              </Alert>
            )}
            <Typography variant="paragraph" color="blue-gray">
              Se ha enviado un código de verificación a {email}. Por favor,
              ingresa el código a continuación.
            </Typography>
            <Input
              type="text"
              label="Código de verificación"
              size="lg"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              type="submit"
              variant="gradient"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? "Verificando..." : "Verificar"}
            </Button>
            <Button
              onClick={handleResendCode}
              variant="text"
              color="blue-gray"
              className="mt-4"
              fullWidth
              disabled={isLoading}
            >
              Reenviar código
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
