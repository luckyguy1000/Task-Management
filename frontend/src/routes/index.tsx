import * as React from "react";
import { createBrowserRouter } from "react-router-dom";

const AppLayout = React.lazy(() => import("../components/layout"));
const App  = React.lazy(() => import("../App"))
const Signup = React.lazy(() => import("../pages/Signup"));
const Signin = React.lazy(() => import("../pages/Signin"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
    ],
  },
]);

export default router;
