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
    await queryInterface.bulkInsert(
      "Images",
      [
        {
          userId: 1,
          spotId: 1,
          reviewId: null,
          previewImage: true,
          url: "https://www.luxsphere.co/wp-content/uploads/Nettleton-House-most-expensive-airbnb-in-the-world-4-.jpg",
        },
        {
          userId: 2,
          spotId: 2,
          reviewId: null,
          previewImage: true,
          url: "https://www.luxsphere.co/wp-content/uploads/Estate-Brisa-most-expensive-airbnb-in-the-world-2-.jpg",
        },
        {
          userId: 3,
          spotId: 3,
          reviewId: null,
          previewImage: true,
          url: "https://www.luxsphere.co/wp-content/uploads/Carbon-Beach-Airbnb-2-.jpg",
        },
        {
          userId: 4,
          spotId: 4,
          reviewId: null,
          previewImage: true,
          url: "https://www.luxsphere.co/wp-content/uploads/most-expensive-airbnb-burgundy-outside.jpg",
        },
        {
          userId: 5,
          spotId: 5,
          reviewId: null,
          previewImage: true,
          url: "https://www.luxsphere.co/wp-content/uploads/most-expnsive-airbnb-in-the-world-Villa-Victoria-4-.jpg",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Images", null, {});
  },
};