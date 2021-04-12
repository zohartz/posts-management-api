const express = require("express");
const router = express.Router({ mergeParams: true });
const { handleError } = require("../utils/handleError");
const { STATUS } = require("../utils/constants");
const postsService = require("../services/postsService");
const Response = require("../utils/response");

// Get all posts
router.get("/", async (req, res) => {
  try {
    const allUserPosts = await postsService.getPostsByAutor(
      req.params.authorId
    );
    const response = new Response(STATUS.OK, "user posts list", allUserPosts);
    res.status(200).send(response);
  } catch (e) {
    handleError(req, res, e);
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;
    const newUser = await postsService.addPost(req);
    const output = {
      title,
      content,
    };
    const response = new Response(STATUS.OK, `Post was addedd`, output);
    res.status(201).send(response);
  } catch (e) {
    handleError(req, res, e);
  }
});

module.exports = router;
