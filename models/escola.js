'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Escola extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Escola.belongsTo(models.Secretaria, {
        foreignKey: 'secretariaId',
        as: 'secretaria'
      });
      Escola.hasMany(models.Professor, {
        foreignKey: 'escolaId',
        as: 'professores'
      });
      Escola.hasMany(models.Aluno, {
        foreignKey: 'escolaId',
        as: 'alunos'
      });
      Escola.hasMany(models.User, {
        foreignKey: 'escolaId',
        as: 'users'
      });
      Escola.hasMany(models.PlanoAcademico, {
        foreignKey: 'escolaId',
        as: 'planosAcademicos'
      });
    }
  }
  Escola.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    secretariaId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Escola',
  });
  return Escola;
};