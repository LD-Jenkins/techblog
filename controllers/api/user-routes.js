const router = require('express').Router();
// const withAuth = require('../../utils/withAuth');
const { User, Post } = require('../../models');

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        userName: req.body.userName,
      },
    });

    const checkPass = await user.checkPassword(req.body.password);

    if (!user || !checkPass) {
      res.status(400).end();
    }

    req.session.save(() => {
      req.session.userName = user.userName;
      req.session.user_id = user.id;
      req.session.logged_in = true;
    });

    res.redirect('/dashboard');

  } catch(error) {
    // console.log(error);
    res.status(500).end();
  };
});

router.post('/signup', async (req, res) => {
  const user = await User.findOne({
    where: {
      userName: req.body.userName,
    },
  })
  
  if (!user) {
    const newUser = await User.create(req.body);

    req.session.save(() => {
      req.session.userName = newUser.userName;
      req.session.user_id = newUser.id;
      req.session.logged_in = true;

      res.end();
    });
  } else {
    res.status(500).end();
  }

});



module.exports = router;
