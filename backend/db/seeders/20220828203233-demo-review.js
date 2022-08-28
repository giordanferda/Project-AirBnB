"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert(
      "Reviews",
      [
        {
          spotId: 1,
          userId: 2,
          review:
            "Great Experience. I would reccommend to my friends & family.",
          stars: 5,
        },
        {
          spotId: 2,
          userId: 1,
          review:
            "My stay at the ferdaBNB was amazing, I loved the experience here.",
          stars: 4,
        },
        {
          spotId: 3,
          userId: 4,
          review:
            "I am definetly coming back This was by far one of the best experiences that me and my friends had at this stay",
          stars: 4,
        },
        {
          spotId: 4,
          userId: 3,
          review:
            "I had an amazing time using ferdaBNB, it was way better than getting a hotel.",
          stars: 5,
        },
        {
          spotId: 5,
          userId: 1,
          review:
            "I had a good time with my friends and my family, the stay was beautiful, views all around.",
          stars: 5,
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
    await queryInterface.bulkDelete("Reviews", null, {});
  },
};
