const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.post('/new-comment', async (req, res) => {

  const newComment = {};
  newComment.body = req.body.commentBody;

  // console.log(req.body.commentBody, req.body.postTitle);

  try {
    const post = await Post.findOne({
      where: {
        title: req.body.postTitle,
      },
    });
  
    const postId = post.id;
  
    const user = await User.findOne({
      where: {
        userName: req.session.userName,
      },
    });
  
    const userId = user.id;
  
    newComment.post_id = postId;
    newComment.user_id = userId;
  
    await Comment.create(newComment);
  
    res.status(200).end();
  } catch (error) {
    res.status(500).end();
  }
  
});

router.post('/delete', async (req, res) => {

  // console.log(req.body.commentBody, req.body.postTitle);
  try {
    const post = await Post.findOne({
      where: {
        title: req.body.postTitle,
      },
    });
  
    const comment = await Comment.destroy({
      where: {
        body: req.body.commentBody,
        post_id: post.id,
      },
    });

    // console.log(post, comment);

    res.status(200).end();

  } catch (error) {
    res.status(500).json(error);
  };
});

module.exports = router;