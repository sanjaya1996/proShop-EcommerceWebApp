const bcrypt = require('bcryptjs');

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Tom Traversy',
    email: 'tomtraversy@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Sanzay Dahal',
    email: 'sanzaydahal@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

module.exports = users;
