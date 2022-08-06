'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Image.belongsTo(models.Spot,{foreignKey: 'spotId', onDelete: 'CASCADE'});
      Image.belongsTo(models.User,{foreignKey: 'userId', onDelete: 'CASCADE'});
      Image.belongsTo(models.Review, {foreignKey: 'reviewId', onDelete: 'CASCADE'})

    }
  }
  Image.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    previewImage: {
      type: DataTypes.BOOLEAN,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    reviewId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};
