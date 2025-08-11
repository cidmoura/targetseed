'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Secretaria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Secretaria.hasMany(models.Escola, {
        foreignKey: 'secretariaId',
        as: 'escolas'
      });
      Secretaria.hasMany(models.User, {
        foreignKey: 'secretariaId',
        as: 'users'
      });
    }
  }
  Secretaria.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Secretaria',
  });
  return Secretaria;
};