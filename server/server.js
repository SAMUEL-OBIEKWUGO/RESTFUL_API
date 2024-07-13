const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const resourceRoutes = require("./routes/resource");
const errorHandler = require("./middleware/errorHandler");

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const dbURI = process.env.MONGODB_URI;

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/resource", resourceRoutes);

// Root route
app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: `RESTFUL-API is live` });
});

// Error handling middleware
app.use(errorHandler);

// 404 route
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route doesn't exist" });
});

// Database and server connection
connectDB()
  .then(() => {
    app.listen(port, "localhost", () => {
      console.log(`RESTFUL-API is connected to http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("Invalid database connection...", error);
  });
