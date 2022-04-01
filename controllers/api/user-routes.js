const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// READ all users from the database
router.get('/', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] }
  })
    .then(allUsersData => res.json(allUsersData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// READ a specific user's data from the database
router.get('/:id', (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Post,
        attributes: ['id', 'title', 'post_body', 'created_at']
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'created_at'],
        include: {
          model: Post,
          attributes: ['title']
        }
      }
    ]
  })
    .then(oneUsersData => {
      if (!oneUsersData) {
        res.status(404).json({ message: 'User not found.' });
        return;
      }
      res.json(oneUsersData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// CREATES a user and adds them to the database
router.post('/', (req, res) => {

  // EXAMPLE input expected:
  //
  //   {
  //   "username": "exampleUsername", 
  //   "email": "example@good.com", 
  //   "password": "notmypassword"
  //   }

  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
    .then(newUserData => {
      req.session.save(() => {
        req.session.user_id = newUserData.id;
        req.session.username = newUserData.username;
        req.session.loggedIn = true;

        res.json(newUserData);
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// Receives the HTTP post query for logging in
router.post('/login', (req, res) => {
  console.log("req ---------- ", req.body)
  // EXAMPLE input expected:
  //
  //   {
  //   "email": "example@good.com", 
  //   "password": "notmypassword"
  //   }

  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(existingUserData => {
    if (!existingUserData) {
      res.status(400).json({ message: 'No such user or password found.' });
      return;
    }

    const validPassword = existingUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'No such user or password found.' });
      return;
    }
    req.session.save(() => {
      req.session.user_id = existingUserData.id;
      req.session.username = existingUserData.username;
      req.session.loggedIn = true;
      res.json({ user: existingUserData, message: 'Welcome back. You have been logged in.' });
    });
  });
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
  else {
    res.status(404).end();
  }
});

  // UPDATE user details
  router.put('/:id', (req, res) => {

    // EXAMPLE input expected (some or all properties):
    //
    //   {
    //   "username": "exampleUsername", 
    //   "email": "example@good.com", 
    //   "password": "notmypassword"
    //   }

    User.update(req.body, {
      individualHooks: true,
      where: {
        id: req.params.id
      }
    })
      .then(updateUserData => {
        if (!updateUserData[0]) {
          res.status(404).json({ message: 'User not found.' });
          return;
        }
        res.json(updateUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.delete('/:id', (req, res) => {
    User.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(deletedUserData => {
        if (!deletedUserData) {
          res.status(404).json({ message: 'User not found.' });
          return;
        }
        res.json(deletedUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  module.exports = router;
