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
          reviewId: 1,
          previewImage: true,
          url: "https://www.wanderlustchloe.com/wp-content/uploads/2018/12/Bali-honeymoon-hotel-12.jpg",
        },
        {
          userId: 2,
          spotId: 2,
          reviewId: 2,
          previewImage: true,
          url: "https://a0.muscache.com/im/pictures/c1dd351c-3898-415a-bcad-bc85d642dc98.jpg?im_w=720",
        },
        {
          userId: 3,
          spotId: 3,
          reviewId: 3,
          previewImage: true,
          url: "https://isabellagarofanelli.com/wp-content/uploads/sites/13205/2020/08/571e46c8-6c68-4c5a-8b9f-6c94913f1bdf-1024x683.jpg",
        },
        {
          userId: 4,
          spotId: 4,
          reviewId: 4,
          previewImage: true,
          url: "https://isabellagarofanelli.com/wp-content/uploads/sites/13205/2020/08/571e46c8-6c68-4c5a-8b9f-6c94913f1bdf-1024x683.jpg",
        },
        {
          userId: 5,
          spotId: 5,
          reviewId: 5,
          previewImage: true,
          url: "https://theblondeabroad.com/wp-content/uploads/2021/01/e0e615aa-7834-42d4-a761-992318630936.jpg",
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
