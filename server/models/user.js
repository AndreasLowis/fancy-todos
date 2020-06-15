'use strict';
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(5)

module.exports = (sequelize, DataTypes) => {

  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class User extends Model {}

  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please fill the titlee'
        }, notEmpty : {
          msg: 'Please fill the titlee'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: {
          args: 5,
          msg: 'Minimal 5'
        }, notEmpty : {
          msg: 'Please fill the title'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Please fill the title'
        }, notEmpty : {
          msg: 'Please fill the title'
        }
      }
    }
  }, {hooks: {
    beforeCreate: (user, options) => {
      user.password = bcrypt.hashSync(user.password, salt)
    }
  },sequelize});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Todo)
  };
  return User;
};