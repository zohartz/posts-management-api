const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./database");
const postsRoute = require("./routes/posts");
const usersRoute = require("./routes/users");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const bodyValidator = require("./middlewares/bodyValidator");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enabling CORS
const corsHeaders = {
  origin: ["*"],
  methods: "GET,POST,OPTIONS,PUT,DELETE",
  preflightContinue: false,
  allowedHeaders: ["Content-Type", "Authorization", "Host", "X-Requested-With"],
  credentials: true,
};
app.use(cors(corsHeaders));

app.get("/test", (req, res) => {
  res.send("users-post-managment");
});

app.use("/api/v1/posts/:authorId", postsRoute);

app.use(
  "/api/v1/posts",
  (req, res, next) => {
    bodyValidator.validate(req, res, next);
  },
  postsRoute
);

app.use(
  "/api/v1/users",
  (req, res, next) => {
    bodyValidator.validate(req, res, next);
  },
  usersRoute
);

app.use(
  `/api/v1/management/swagger`,
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.use("/*", (req, res) => {
  res.status(404).json({
    description: "Invalid endpoint - url does not exist",
    status: 404,
  });
});

app.listen(process.env.port, process.env.host);
console.log(`Running on http://${process.env.host}:${process.env.port}`);
