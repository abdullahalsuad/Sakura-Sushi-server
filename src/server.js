require("dotenv").config();
const express = require("express");
const { ObjectId } = require("mongodb");
const cors = require("cors");
const connectDB = require("./config/db");

const sushiModel = require("./models/sushiModel");
const sushiRoutes = require("./routes/sushiRoutes");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to DB and inject collection into model
connectDB().then(async (db) => {
  await sushiModel.injectDB(db);

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});

// Routes
app.use("/api", sushiRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Sushi server is running");
});
