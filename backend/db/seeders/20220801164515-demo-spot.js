"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Spots", [
      {
        ownerId: 1,
        address: "1 Nettleton House",
        city: "Cape Town",
        state: "South Africa",
        country: "Africa",
        lat: 123.323321,
        lng: 144.991232,
        name: "Nettleton House",
        description:
          "Located near Clifton Beach is this special Airbnb with hillside pool and lounge which overlook the ocean.",
        price: 2000,
      },
      {
        ownerId: 2,
        address: "2",
        city: "2",
        state: "2",
        country: "2",
        lat: 123.323321,
        lng: 144.991232,
        name: "2",
        description:
          "Located near Clifton Beach is this special Airbnb with hillside pool and lounge which overlook the ocean.",
        price: 2000,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Spots", null, {});
  },
};
