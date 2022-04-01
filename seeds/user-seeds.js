const { User } = require('../models');

const userData = [
  {
    email: '1ABC@123.com',
    password: 'thesame',
    username: 'Arrow'
  },
  {
    email: '2ABC@123.com',
    password: 'thesame',
    username: 'Jessie'
  },
  {
    email: '3ABC@123.com',
    password: 'thesame',
    username: 'Sam'
  },
  {
    email: '4ABC@123.com',
    password: 'thesame',
    username: 'Finley'
  },
  {
    email: '5ABC@123.com',
    password: 'thesame',
    username: 'Dakota'
  },
];

const seedUsers = () => User.bulkCreate(userData, {individualHooks: true});

module.exports = seedUsers;
