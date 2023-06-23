const cors = require('cors');
const express = require('express');
const app = express();
const port = 8000;
const ejs = require("ejs");
const path = require("path");
const routes = require("./routes/routes");
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const { router: authRoutes } = require("./routes/auth"); // Destructure the router from the authRoutes object
const fileUpload = require('express-fileupload'); // Require the express-fileupload middleware

app.set("view engine", "ejs");
app.use(cors());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// File upload middleware
app.use(fileUpload());

// Routes setup
app.use("/", routes);
app.use("/", authRoutes);
app.use(express.static(path.join(__dirname, "views")));
app.use(express.static(path.join(__dirname, "uploads"), { extensions: ["jpg", "jpeg", "png", "gif"] }));

// Error handler middleware
const errorHandler = (err, req, res, next) => {
  console.error(err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode);
  res.json({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
};

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
