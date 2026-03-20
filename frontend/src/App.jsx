import { RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Verify from "./pages/Verify";
import VerifyEmail from "./pages/VerifyEmail";
import Navbar from "./components/Navbar";

export const routes = [
  {
    path: "/",
    element: (
      <>
        
        <Home />
      </>
    ),
  },
  {
    path: "/signup",
    element: (
      <>
       
        <Signup />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        
        <Login />
      </>
    ),
  },
  {
    path: "/verify",
    element: <Verify />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },
];

const App = ({ router }) => {
  return <RouterProvider router={router} />;
};

export default App;