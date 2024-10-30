import Dashboard from "./components/home/Dashboard";
import ProtectedRoute from "./components/login/middleware/ProtectedRoute";
import { Login } from "./pages";

export const routes = [
    {
        path: '/',
        component: <Dashboard/>,
    },
    {
        path: '/login',
        component:<Login />
    },
]
