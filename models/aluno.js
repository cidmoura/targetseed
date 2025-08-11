'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Aluno extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Aluno.belongsTo(models.Escola, {
        foreignKey: 'escolaId',
        as: 'escola'
      });
      Aluno.belongsToMany(models.Pai, {
        through: 'AlunoPai',
        foreignKey: 'alunoId',
        otherKey: 'paiId',
        as: 'pais'
      });
    }
  }
  Aluno.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    grade: {
      type: DataTypes.STRING,
      allowNull: false
    },
    escolaId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Aluno',
  });
  return Aluno;
};