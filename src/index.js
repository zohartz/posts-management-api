const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var db = require("./database");
const postsRoute = require("./routes/posts");
const usersRoute = require("./routes/users");

const HOST = "0.0.0.0";
const PORT = 5001;

const app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

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

app.use("/api/v1/posts/", postsRoute);
//app.use('/api/v1/users/:authorId', usersRoute);
app.use("/api/v1/users", usersRoute);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
