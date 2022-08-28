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
    await queryInterface.bulkInsert("Bookings", [
      {
        userId: 1,
        spotId: 1,
        startDate: "2023-01-01",
        endDate: "2023-01-10",
      },
      {
        userId: 2,
        spotId: 2,
        startDate: "2023-02-10",
        endDate: "2023-02-20",
      },
      {
        userId: 3,
        spotId: 3,
        startDate: "2023-03-10",
        endDate: "2023-03-20",
      },
      {
        userId: 4,
        spotId: 4,
        startDate: "2023-04-10",
        endDate: "2023-04-20",
      },
      {
        userId: 5,
        spotId: 5,
        startDate: "2023-05-10",
        endDate: "2023-05-20",
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
    await queryInterface.bulkDelete("Bookings", null, {});
  },
};
