const express = require("express");
const router = express.Router();
const { handleError } = require("../utils/handleError");
const { STATUS } = require("../utils/constants");
const usersService = require("../services/usersService");
const Response = require("../utils/response");

// login
router.post("/login", async (req, res) => {
  try {
    const user = await usersService.getUser(req.body.email, req.body.password);
    const output = {
      id: user.id,
    };
    const response = new Response(
      STATUS.OK,
      "user logged in successfully",
      output
    );
    res.status(200).send(response);
  } catch (e) {
    handleError(req, res, e);
  }
});

// register user
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, password, email } = req.body;
    const newUser = await usersService.addUser(req);
    const output = {
      firstName,
      lastName,
    };
    const response = new Response(
      STATUS.OK,
      `User ${firstName} was addedd`,
      output
    );
    res.status(201).send(response);
  } catch (e) {
    handleError(req, res, e);
  }
});

module.exports = router;
