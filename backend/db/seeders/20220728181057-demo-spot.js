'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: '1 Coconut Lane',
        city: 'Paradise1',
        state: 'Island1',
        country: 'USA',
        lat: 123.323321,
        lng: 144.991232,
        name: 'place1',
        description: 'Paridise on earth',
        price: 250
      },
      {
        ownerId: 2,
        address: '2 Coconut Lane',
        city: 'Paradise2',
        state: 'Island2',
        country: 'USA',
        lat: 123.123,
        lng: 144.144,
        name: 'place2',
        description: 'Paridise on earth',
        price: 250
      },
      {
        ownerId: 3,
        address: '3 Coconut Lane',
        city: 'Paradise3',
        state: 'Island3',
        country: 'USA',
        lat: -123.123,
        lng: -144.991232,
        name: 'place3',
        description: 'Paridise on earth',
        price: 250
      },
      {
        ownerId: 4,
        address: '4 Coconut Lane',
        city: 'Paradise4',
        state: 'Island4',
        country: 'USA',
        lat: 13.321,
        lng: 134.99152,
        name: 'place4',
        description: 'Paridise on earth',
        price: 250
      },
      {
        ownerId: 5,
        address: '5 Coconut Lane',
        city: 'Paradise5',
        state: 'Island5',
        country: 'USA',
        lat: 145.323321,
        lng: 148.991232,
        name: 'place5',
        description: 'Paridise on earth',
        price: 250
      },
    ])
  },


  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Spots', null, {});
  }
};
