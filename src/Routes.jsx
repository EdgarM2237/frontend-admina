import { Route, Routes } from "react-router-dom";
import { Dashboard, Login } from "./pages";
import ProtectedRoute from "./components/login/middleware/ProtectedRoute";
import EmailVerification from "./components/verification/EmailVeification";

export const AppRoute = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute><Dashboard/></ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/verify" element={<EmailVerification />} />
    </Routes>
  );
};
