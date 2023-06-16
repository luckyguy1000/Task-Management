import express = require("express");
import { Application } from "express";
import * as bodyParser from "body-parser";

import setRoutes from "./routes/index";

const app: Application = express();

app.use(bodyParser.json());

setRoutes(app);

export default app;
