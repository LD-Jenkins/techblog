const router = require('express').Router();
const { User, Post, Comment } = require('../../models');



router.post('/new-post', async (req, res) => {

  try {

    const user = await User.findOne({
      where: {
        userName: req.session.userName,
      },
    });
  
    req.body.user_id = user.id;
    
    await Post.create(req.body);
    res.end();

  } catch (error) {
    res.status(500).json(error);
  }
  
});

router.post('/delete', async (req, res) => {

  try {
    
    Post.destroy({
      where: {
        title: req.body.postTitle,
      },
    });

    res.render('homepage');

  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;