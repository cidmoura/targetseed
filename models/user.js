'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Secretaria, {
        foreignKey: 'secretariaId',
        as: 'secretaria'
      });
      User.belongsTo(models.Escola, {
        foreignKey: 'escolaId',
        as: 'escola'
      });
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('master_admin', 'secretariat_admin', 'school_director'),
      allowNull: false
    },
    secretariaId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    escolaId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};