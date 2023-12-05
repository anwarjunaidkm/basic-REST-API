const Post = require("../models/postModel");
exports.showPosts = (req, res, next) => {
  const posts = Post.find()
    .then((post) => {
      res.status(200).json({
        posts: post,
        userid: req.userid,
        name: req.name,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;

  const post = new Post({
    title: title,
    content: content,
  });
  post
    .save()
    .then((result) => {
      res.status(200).json({
        message: "created post",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
