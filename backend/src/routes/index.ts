import { Application, Request, Response } from "express";

const setRoutes = (app: Application) => {
  app.get("/", (req: Request, res: Response) =>
    res.status(200).json({ message: "Welcome to the Task Management API." })
  );
};

export default setRoutes;
