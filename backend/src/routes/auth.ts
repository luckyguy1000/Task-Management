import { Application } from "express";

import * as Auth from "../controllers/auth";
import * as User from "../controllers/users";

const setAuthRoute = (app: Application) => {
  app.post("/auth/login", Auth.login);
  app.post("/auth/register", User.create);
};

export default setAuthRoute;
