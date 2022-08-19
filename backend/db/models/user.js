'use strict';
const { Model, Validator } = require('sequelize');
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    }
    static async signup({firstName, lastName, username, email, password }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        firstName,
        lastName,
        username,
        email,
        hashedPassword
      });
      return await User.scope('currentUser').findByPk(user.id);
    }
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }
    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }
    toSafeObject() {
      const { id, firstName, lastName, email, username } = this; // context will be the User instance
      return { id, firstName, lastName, email, username };
    }
    static associate(models) {
      User.hasMany(models.Image, {foreignKey : 'userId', onDelete: 'CASCADE'});
      User.hasMany(models.Spot, {foreignKey: 'ownerId', onDelete: 'CASCADE'});
      User.hasMany(models.Review, {foreignKey: 'userId', onDelete: 'CASCADE'});
    }
  };

  User.init(
    {
      firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: false,
        validate: {
          len: [1, 50]
        }
      },
      lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: false,
        validate: {
          len: [1, 50]
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [3, 200]
        }
      },
      username: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          }
        }
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60]
        }
      }
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
        }
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword", 'createdAt', 'updatedAt'] }
        },
        loginUser: {
          attributes: {}
        }

      }

    }
  );
  return User;
};
