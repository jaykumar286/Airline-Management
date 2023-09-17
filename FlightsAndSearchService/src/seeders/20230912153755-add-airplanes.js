"use strict";

/** @type {import('sequelize-cli').Migration} */
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
      "Airplanes",
      [
        {
          modelNumber: "Boeing 777",
          capacity: 300,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          modelNumber: "Boeing 127",
          capacity: 330,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          modelNumber: "Boeing 227",
          capacity: 380,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          modelNumber: "Boeing 427",
          capacity: 250,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          modelNumber: "Boeing 187",
          capacity: 350,
          createdAt: new Date(),
          updatedAt: new Date(),
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
  },
};
