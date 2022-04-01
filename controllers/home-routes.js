const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');


// GET ALL POSTS AND DETAILS
router.get('/', (req, res) => {
  console.log(req.session);

  Post.findAll({
    attributes: [
      'id',
      'post_body',
      'title',
      'created_at'
    ],
    order: [['created_at', 'DESC']],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(allPostData => {
      const posts = allPostData.map(post => post.get({ plain: true }));
      return posts;
    })
    .then(posts => res.render('homepage', { 
      posts,
      loggedIn: req.session.loggedIn
     }))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// LOGIN PAGE
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard'); 
    return;
  }
  res.render('login');
});

// GET A SPECIFIC POST
router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'post_body',
      'title',
      'created_at',
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      let post = dbPostData.get();
      console.log('-------', post)
      post = dbPostData.get({ plain: true });
      console.log('7777777', post)
      res.render('single-post', {
        post,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
module.exports = router;