const { Comment } = require('../models');

const commentData = [
  {
    user_id: 1,
    post_id: 6,
    comment_text: 'lorem ipsum ... X'
  },
  {
    user_id: 1,
    post_id: 7,
    comment_text: 'lorem ipsum ... Y'
  },
  {
    user_id: 1,
    post_id: 8,
    comment_text: 'lorem ipsum ... Z'
  },
  {
    user_id: 2,
    post_id: 6,
    comment_text: 'lorem ipsum ... AX'
  },
  {
    user_id: 3,
    post_id: 1,
    comment_text: 'lorem ipsum ... BX'
  },
  {
    user_id: 3,
    post_id: 3,
    comment_text: 'lorem ipsum ... CX'
  },
  {
    user_id: 3,
    post_id: 4,
    comment_text: 'lorem ipsum ... DX'
  },
  {
    user_id: 3,
    post_id: 5,
    comment_text: 'lorem ipsum ... EX'
  },
  {
    user_id: 4,
    post_id: 1,
    comment_text: 'lorem ipsum ... FX'
  },
  {
    user_id: 4,
    post_id: 2,
    comment_text: 'lorem ipsum ... GX'
  },
  {
    user_id: 4,
    post_id: 8,
    comment_text: 'lorem ipsum ... HX'
  },
  {
    user_id: 5,
    post_id: 3,
    comment_text: 'lorem ipsum ... IX'
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
