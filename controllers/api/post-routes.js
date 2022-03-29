const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment } = require('../../models');

// READ all posts from database and their comments
router.get('/', (req, res) => {

  Post.findAll({
    attributes: [
      'id',
      'post_url',
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
    .then(allPostData => res.json(allPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// READ one post from database with it's poster's username and comments on the post with their usernames
router.get('/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'post_url',
      'title',
      'created_at'
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
    .then(onePostsData => {
      if (!onePostsData) {
        res.status(404).json({ message: 'No such post.' });
        return;
      }
      res.json(onePostsData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// CREATES a post and adds it to the database
router.post('/', (req, res) => {

    // EXAMPLE input:
    // {
    // title: 'Dyslexic's of the World Untie!',
    // post_body: 'lorem ipsum...',
    // user_id: 1
    // }

  Post.create({
    title: req.body.title,
    post_body: req.body.post_body,
    user_id: req.body.user_id
  })
    .then(createdPostData => res.json(createdPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// UPDATES a post's title once it's already in the database
router.put('/:id', (req, res) => {
  Post.update(
    {
      title: req.body.title
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No such post.' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETES a post from the database
router.delete('/:id', (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(deletedPostData => {
      if (!deletedPostData) {
        res.status(404).json({ message: 'No such post.' });
        return;
      }
      res.json(deletedPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
