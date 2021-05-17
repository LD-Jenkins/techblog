const router = require('express').Router();
const { User, Post, Comment } = require('../models');

router.get('/', async (req, res) => {

  try {
    const posts = await Post.findAll({
      limit: 5,
    });

    const postUserIds = posts.map(post => post.user_id);
    const userIdSet = [...new Set(postUserIds)];
    const uniqueUsers = [...userIdSet];

    // console.log(uniqueUsers);
  
    const users = await User.findAll({
      where: {
        id: uniqueUsers,
      },
      attributes: {
        exclude: ['password'],
      },
    });
    // console.log(users);
    const postUserArr = posts.map(post => {
      const thisUser = users.find(user => user.id === post.user_id);
      // console.log(thisUser, thisUser.userName);
      return {
        userName: thisUser.userName,
        title: post.title,
        body: post.body,
      }
    });

    // console.log(postUserArr);
  
    res.status(200).render('homepage', {
      postUserArr,
      logged_in: req.session.logged_in,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  };
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
})

router.get('/dashboard', async (req, res) => {
  const user = req.session.userName;
  if (user) {
    try {
      
      const user = await User.findOne({
        where: {
          userName: req.session.userName,
        },
      });

      const posts = await Post.findAll({
        where: {
          user_id: user.id,
        },
      });

      // console.log(posts);

      res.render('dashboard', {
        userName: req.session.userName,
        posts,
      });

    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.render('login');
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.get('/new-post', (req, res) => {
  res.render('newpost');
});

router.get('/posts/:postTitle', async (req, res) => {

  // if (req.params.postTitle === 'favicon.ico') {
  //   res.end();
  // };

  const post = await Post.findOne({
    where: {
      title: req.params.postTitle,
    },
  });
  // console.log(post);

  const postUser = await User.findOne({
    where: {
      id: post.user_id,
    },
  });

  let sameUserPost;
  if (postUser.id === post.user_id) {
    sameUserPost = true;
  }
  
  // console.log(postUser);

  const comments = await Comment.findAll({
    where: {
      post_id: post.id,
    },
  });

  let hasComments;
  if (!comments) {
    hasComments = false;
  };

  // console.log(comments);
  
  // remove duplicate values so duplicate results are not returned from User.findAll()
  const userIds = comments.map(comment => comment.user_id);
  const userIdSet = [...new Set(userIds)];
  const uniqueUserIds = [...userIdSet];

  const users = await User.findAll({
    where: {
      id: [uniqueUserIds],
    },
    attributes: {
      exclude: ['password'],
    },
  });

  // pair comment bodies with the userName of the user that submitted them
  const commentUserArr = comments.map(comment => {
    const thisUser = users.find(user => user.id === comment.user_id);
    const sameUser = thisUser.userName === req.session.userName;
    return {
      userName: thisUser.userName,
      commentBody: comment.body,
      sameUser,
    }
  });

  res.render('postwithcomments', {
    postTitle: post.title,
    postBody: post.body,
    postUser: postUser.userName,
    usersAndComments: commentUserArr,
    hasComments,
    sameUserPost,
  });
});

module.exports = router;