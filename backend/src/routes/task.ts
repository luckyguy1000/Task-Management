import { Application } from "express";

import * as Task from "../controllers/tasks";

const setTasksRoute = (app: Application) => {
  const endpoint: string = process.env.API_BASE + "tasks";

  app.get(endpoint, Task.getAll);
  app.post(endpoint, Task.create);
  app.all(endpoint + "/:id", Task.isEditable);
  app.get(endpoint + "/:id", Task.getOne);
  app.put(endpoint + "/:id", Task.update);
  app.delete(endpoint + "/:id", Task.deleteOne);
};

export default setTasksRoute;
