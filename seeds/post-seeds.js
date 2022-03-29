const { Post } = require('../models');

const postData = [
  {
    title: 'Plain T-Shirt',
    post_body: 'Lorem ipsum ...',
    user_id: 1,
  },
  {
    title: 'Goober',
    post_body: 'Lorem ipsum ...',
    user_id: 2,
  },
  {
    title: 'CUBA',
    post_body: 'Lorem ipsum ...',
    user_id: 3,
  },
  {
    title: 'Star Wars',
    post_body: 'Lorem ipsum ...',
    user_id: 4,
  },
  {
    title: 'Krishna',
    post_body: 'Lorem ipsum ...',
    user_id: 5,
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
