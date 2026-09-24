import {createBrowserRouter} from 'react-router-dom'
import Login from '../feature/auth/pages/Login'
import Register from '../feature/auth/pages/Register'
import NotFound from '../feature/auth/pages/NotFound'
import Dashboard from "../feature/products/pages/Dashboard"
import App from './App'

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: "register",
    element: <Register />,
    errorElement: <NotFound />,
  },
  {
    path: "/seller/dashboard",
    element: <Dashboard />,
    errorElement: <NotFound />,
  },
]);

export default routes;