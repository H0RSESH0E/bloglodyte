const router = require('express').Router();
const { Comment } = require('../../models');

// READS all comments from the database
router.get('/', (req, res) => {
  Comment.findAll()
    .then(allCommentData => res.json(allCommentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// CREATES comment
router.post('/', (req, res) => {

  // EXAMPLE input:
  // {
  // comment_text: "This comment is not real",
  // user_id: 1,
  // post_id: 2
  // }

  if (req.session) {
    Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      // use the id from the session
      user_id: req.session.user_id
    })
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

// DELETE a comment form the database
router.delete('/:id', (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(deletedCommentData => {
      if (!deletedCommentData) {
        res.status(404).json({ message: 'No such comment' });
        return;
      }
      res.json(deletedCommentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
