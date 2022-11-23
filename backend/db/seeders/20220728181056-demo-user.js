'use strict';

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    return queryInterface.bulkInsert(options, [
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
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['TOTHEMOON', 'Uzivert', 'HonestlyNevermind', 'LifeOfPablo', 'WimbeldonChamp'] }
    }, {});
  }
};
