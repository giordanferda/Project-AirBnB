'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.belongsTo(models.Spot, {foreignKey: 'spotId', onDelete: 'CASCADE'});
      Review.belongsTo(models.User, {foreignKey: 'userId', onDelete: 'CASCADE'});
      Review.hasMany(models.Image, {foreignKey: 'reviewId', onDelete: 'CASCADE'})
    }
  }
  Review.init({
    spotId: {
      type: DataTypes.INTEGER

    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    review: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 255]
      }
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      }
    },
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
