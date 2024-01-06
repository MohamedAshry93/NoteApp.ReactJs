import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { UserContext } from "./Context/userContext";
import { useContext, useEffect } from "react";
import UserContextProvider from "./Context/userContext";
import NoteContextProvider from "./Context/noteContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import NotFound from "./components/NotFound/NotFound";

export default function App() {
  const routers = createHashRouter([
    {
      path: "",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Home /> },
        { path: "*", element: <NotFound /> },
      ],
    },
    { path: "login", element: <Login /> },
    { path: "register", element: <Register /> },
  ]);

  // let { setUserToken } = useContext(UserContext);
  // useEffect(() => {
  //   if (localStorage.getItem("userToken") !== null) {
  //     setUserToken({ token: localStorage.getItem("userToken") });
  //   }
  // }, []);
  return (
    <>
      <UserContextProvider>
        <NoteContextProvider>
          <RouterProvider router={routers}></RouterProvider>
        </NoteContextProvider>
      </UserContextProvider>
    </>
  );
}
