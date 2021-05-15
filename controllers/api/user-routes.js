const router = require('express').Router();
const withAuth = require('../../utils/withAuth');
const { User, Post } = require('../../models');

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        userName: req.body.userName,
      },
    });

    if (!user) {
      res
        .status(400)
        .json({
          message: 'Incorrect email or password, please try again',
        });
      return;
    }

    const isValidPassword = await user.checkPassword(req.body.password);

    if (!isValidPassword) {
      res
        .status(400)
        .json({
          message: 'Incorrect email or password, please try again',
        });
      return;
    }

    req.session.save(() => {
      req.session.userName = user.userName;
      req.session.user_id = user.id;
      req.session.logged_in = true;

      res.json({
        message: 'You are now logged in!',
       });
    });

  } catch (error) {
    res.status(500).json(error);
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

router.get('/signUpRedirect', (req, res) => {
  res.render('signup');
});

router.post('/signup', async (req, res) => {
  await User.findOne({
    where: {
      userName: req.body.userName,
    },
  })
  .then(user => {
    if (!user) {
      const newUser = await User.create(req.body);

      req.session.save(() => {
        req.session.userName = newUser.userName;
        req.session.user_id = newUser.id;
        req.session.logged_in = true;
  
        res.json({
          message: 'Account created successfully!',
         });
      });
    }
  })
})

module.exports = router;
