const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.post('/newcomment', async (req, res) => {

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

router.delete('/delete', async (req, res) => {

  try {
    const post = await Post.findOne({
      where: {
        title: req.body.postTitle,
      },
    });
  
    await Comment.destroy({
      where: {
        body: req.body.commentBody,
        post_id: post.id,
        user_id: req.session.user_id,
      },
    });

    // console.log(post, comment);

    res.status(200).end();

  } catch (error) {
    res.status(500).json(error);
  };
});

module.exports = router;