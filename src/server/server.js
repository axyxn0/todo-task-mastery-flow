
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? false : "http://localhost:8080"
}));

// Parse requests with JSON payloads
app.use(express.json());

// Parse requests with URL-encoded payloads
app.use(express.urlencoded({ extended: true }));

// Database connection
const db = require("./models");
db.sequelize.sync()
  .then(() => {
    console.log("Database synchronized successfully.");
  })
  .catch((err) => {
    console.log("Failed to sync database: " + err.message);
  });

// Routes
require("./routes/todo.routes")(app);

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
  });
}

// Set port and listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
