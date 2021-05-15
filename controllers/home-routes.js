const router = require('express').Router();
const { User, Post } = require('../models');

router.get('/', async (req, res) => {

  try {
    const postData = await Post.findAll({
      limit: 5,
    });
  
    const posts = postData.map(post => {
      const userName = await User.findOne({
        where: {
          id: post.user_id,
        },
        attributes: {
          exclude: ['password'],
        },
      });
      return {
        title,
        body,
        userName,
      }
    });
  
    res.render('homepage', {
      posts,
    });

  } catch (error) {
    res.status(500).json(error);
  };
});

router.get('/:userName', async (req, res) => {

  try {
    // const user = await User.findOne({
    //   where: {
    //     userName: req.params.userName,
    //   },
    // });

    const posts = await Post.findAll({
      where: {
        user_id: req.session.id,
      },
    });

    res.render('dashboard', {
      posts,
    });

  } catch (error) {
    res.status(500).json(error);
  }
});


module.exports = router;