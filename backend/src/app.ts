import express = require("express");
import { Application } from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import helmet from "helmet";

import passport from "./jwtpassport";
import setRoutes from "./routes/index";

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(helmet());

app.use(passport.initialize());
app.all(process.env.API_BASE + "*", (req, res, next) => {
  return passport.authenticate(
    "jwt",
    { session: false, failWithError: true },
    (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        if (info.name === "TokenExpiredError") {
          return res.status(401).json({
            message: "Your token has expired. Please generate a new one",
          });
        } else {
          return res.status(401).json({ message: info.message });
        }
      }
      req.body.user = user;
      return next();
    }
  )(req, res, next);
});

setRoutes(app);

export default app;
