import { Application, Request, Response } from "express";

import setAuthRoute from "./auth";
import setUsersRoute from "./users";
import setTasksRoute from "./task";

const setRoutes = (app: Application) => {
  app.get("/", (req: Request, res: Response) =>
    res.status(200).json({ message: "Welcome to the Task Management API." })
  );

  setAuthRoute(app);
  setUsersRoute(app);
  setTasksRoute(app);
};

export default setRoutes;
