'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pai extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pai.belongsToMany(models.Aluno, {
        through: 'AlunoPai',
        foreignKey: 'paiId',
        otherKey: 'alunoId',
        as: 'alunos'
      });
    }
  }
  Pai.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Pai',
  });
  return Pai;
};