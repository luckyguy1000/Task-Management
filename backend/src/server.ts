import "dotenv/config";

import app from "./app";

const port = process.env.APP_PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
