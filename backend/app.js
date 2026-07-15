const express = require("express");
const cors = require("cors");
const inquiryRoutes = require("./routes/inquiryRoutes");
const { errorHandler, notFound } = require("./middleware/errorHandler");

function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/api/health", (req, res) => {
    res.status(200).json({ success: true, message: "API is healthy" });
  });

  app.use("/api/inquiry", inquiryRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}

module.exports = createApp;
