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
        address: "Estate Brisa",
        city: "Punta Mita",
        state: "Mexico",
        country: "South America",
        lat: 123.123,
        lng: 144.144,
        name: "Estate Brisa",
        description:
          "One of the most luxurious properties Punta Mita has to offer with direct views if the blue waters.",
        price: 1800,
      },
      {
        ownerId: 3,
        address: "5 Carbon Beach Dr",
        city: "Malibu",
        state: "California",
        country: "USA",
        lat: -123.123,
        lng: -144.991232,
        name: "Carbon Beach House",
        description:
          "Carbon beach is Los Angeles is nicknamed “Billionaires Beach” for a reason. ",
        price: 2000,
      },
      {
        ownerId: 4,
        address: "13 Villa Victoria",
        city: "Côte d’Azur",
        state: "France",
        country: "Europe",
        lat: 13.321,
        lng: 134.99152,
        name: "Villa Victoria",
        description:
          "Villa Victoria is a hidden heaven that sits between the worlds most famous Canoubiers Beach.",
        price: 2500,
      },
      {
        ownerId: 5,
        address: "3 Villa Machiavelli",
        city: "Toscana",
        state: "Italy",
        country: "Europe",
        lat: 145.323321,
        lng: 148.991232,
        name: "Villa Machiavelli",
        description:
          "This villa is based just 20 minutes outside Florence in the Chianti Classico region.",
        price: 3000,
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
