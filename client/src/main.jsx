import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import ProfilePage from "./pages/profile.jsx";
import SignupPage from "./pages/Signup.jsx";
import LoginPage from "./pages/Login.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
// import "./index.css";

// Fonts

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path:'/me',
        element:<ProfilePage></ProfilePage>
      },
      {
        path:'/signup',
        element:<SignupPage></SignupPage>
      },
      {
        path:'/login',
        element:<LoginPage></LoginPage>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
