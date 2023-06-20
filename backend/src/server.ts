import "dotenv/config";
import mongoose from "mongoose";
mongoose.Promise = require("bluebird");
import * as dbConfig from './config/db.config'

import app from "./app";

const port = process.env.NODE_DOCKER_PORT || 3000;

mongoose
  .connect(dbConfig.uri)
  .then(() => {
    console.log("Connected to MongoDB successfully.");
  })
  .catch((err) => {
    console.log(
      `MongoDB connection error. Please make sure MongoDB is running. ${err}`
    );
    process.exit();
  });

const server = app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
