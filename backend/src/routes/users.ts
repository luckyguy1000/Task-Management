import { Application } from "express";

import * as User from "../controllers/users";

const setUsersRoute = (app: Application) => {
  const endpoint: string = process.env.API_BASE + "users";

  app.get(endpoint, User.getAll);
  app.post(endpoint, User.create);
  app.get(endpoint + "/:id", User.getOne);
  app.put(endpoint + "/:id", User.update);
  app.delete(endpoint + "/:id", User.deleteOne);
};

export default setUsersRoute;
