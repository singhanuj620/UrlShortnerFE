import {
    createBrowserRouter
  } from "react-router-dom";
import App from "./App"
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import Homepage from "./Components/Homepage/Homepage";
import Profile from "./Components/Profile/Profile";
import RedirectUrl from "./Components/RedirectUrl/RedirectUrl";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "signup",
          element: <Signup />,
        },
        {
          path: "short",
          element: <Homepage />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "s/:shorturl",
          element: <RedirectUrl />,
        },
      ],
    },
  ]);

export default router