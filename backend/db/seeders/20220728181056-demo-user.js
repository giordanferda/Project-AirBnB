'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Yilon',
        lastName: 'Ma',
        email: 'Tersa@gmail.com',
        username: '',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Lil',
        lastName: 'Uzi',
        email: 'YessirSki@gmail.com',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Champagne',
        lastName: 'Papi',
        email: 'drake@user.io',
        username: 'HonestlyNevermind',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
