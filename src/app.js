const express = require("express");
const sequelize = require("./database/db");
const errorHandler = require("./middlewares/errorHandler");
const app = express();

const aiChatbotApiRoutes = require("./routes/ai-chatbot/aiChatbotApiRoutes");

app.use(express.json());

(async () => {
  try {
    await sequelize.sync({ force: false, alter: false });
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
})();

app.get("/", (req, res) => {
  res.send("App is running!");
});

app.use("/api", aiChatbotApiRoutes);

app.use(errorHandler);

module.exports = app;
