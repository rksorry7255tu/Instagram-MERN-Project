import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import MainLayout from "./components/MainLayout";
import Profile from "./components/Profile";
import Signup from "./components/Signup";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  // const browserRoute = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <MainLayout />,
  //     children: [
  //       {
  //         path: "/",
  //         element: <Home />,
  //       },
  //       {
  //         path: "/profile",
  //         element: <Profile />,
  //       },
  //     ],
  //   },
  //   {
  //     path: "/login",
  //     element: <Login />,
  //   },
  //   {
  //     path: "/signup",
  //     element: <Signup />,
  //   },
  // ]);

  const browserRoute = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path:""
        }
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Signup />,
    },
  ]);

  return (
    <>
      <RouterProvider router={browserRoute} />
    </>
  );
}

export default App;
