const { User } = require('../models');

const userData = [
  {
    email: '1ABC@123.com',
    password: 'thesame',
    username: 'Shirts'
  },
  {
    email: '2ABC@123.com',
    password: 'thesame',
    username: 'Shorts'
  },
  {
    email: '3ABC@123.com',
    password: 'thesame',
    username: 'Music'
  },
  {
    email: '4ABC@123.com',
    password: 'thesame',
    username: 'Hats'
  },
  {
    email: '5ABC@123.com',
    password: 'thesame',
    username: 'Shoes'
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
