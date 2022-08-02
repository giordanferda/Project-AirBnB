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
      Image.belongsTo(models.Spot,{foreignKey: 'spotId'});
      Image.belongsTo(models.User,{foreignKey: 'userId'});
      Image.belongsTo(models.Review, {foreignKey: 'reviewId'})

    }
  }
  Image.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    previewImage: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};
