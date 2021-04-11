const Post = require("../models/Post");
const DbError = require("../utils/dbError");

exports.getPostsByAutor = async (authorId) => {
  try {
    const postsCollection = await Post.find({ authorId: authorId });
    return postsCollection;
  } catch (error) {
    throw new Error(error);
  }
};
exports.addPost = async (req) => {
  try {
    const { title, content, authorId } = req.body;
    const post = new Post({
      title,
      content,
      authorId,
    });
    await post.save();
    return post;
  } catch (error) {
    throw new Error(error);
  }
};
