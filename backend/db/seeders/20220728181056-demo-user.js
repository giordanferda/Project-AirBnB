'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Yilon',
        lastName: 'Ma',
        email: 'Tersa@gmail.com',
        username: 'TOTHEMOON',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Lil',
        lastName: 'Uzi',
        email: 'YessirSki@gmail.com',
        username: 'Uzivert',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Champagne',
        lastName: 'Papi',
        email: 'drake@user.io',
        username: 'HonestlyNevermind',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'YE',
        lastName: 'WEST',
        email: 'yeezy@user.io',
        username: 'LifeOfPablo',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        firstName: 'Roger',
        lastName: 'Federer',
        email: 'RF@user.io',
        username: 'WimbeldonChamp',
        hashedPassword: bcrypt.hashSync('password5')
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['TOTHEMOON', 'Uzivert', 'HonestlyNevermind', 'LifeOfPablo', 'WimbeldonChamp'] }
    }, {});
  }
};
