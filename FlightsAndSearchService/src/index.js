const express = require("express");
const bodyparser = require("body-parser");
const { PORT } = require("./config/serverConfig");

const apiRoutes = require("./routes/index");

const setupAndStartServer = async () => {
  const app = express();

  app.use(bodyparser.urlencoded({ extended: true }));
  app.use(bodyparser.json());
  app.use("/api", apiRoutes);

  app.listen(PORT, async () => {
    console.log(`Server Running on Port:${PORT}`);
  });
};

setupAndStartServer();
