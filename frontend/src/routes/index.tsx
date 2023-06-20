import * as React from "react";
import { createBrowserRouter } from "react-router-dom";

const AppLayout = React.lazy(() => import("../components/layout"));
const TaskListPage = React.lazy(() => import("../pages/TaskListPage"));
const TaskEditPage = React.lazy(() => import("../pages/TaskEditPage"));
const Signup = React.lazy(() => import("../pages/Signup"));
const Signin = React.lazy(() => import("../pages/Signin"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <TaskListPage />,
      },
      {
        path: "/tasks/new",
        element: <TaskEditPage />,
      },
      {
        path: "/tasks/edit/:id",
        element: <TaskEditPage />,
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
