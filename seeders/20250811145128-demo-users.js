'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Hash passwords
    const salt = bcrypt.genSaltSync(10);
    const smePassword = bcrypt.hashSync('sme123', salt);
    const diretorPassword = bcrypt.hashSync('diretor123', salt);

    // Insert Secretaria and get its ID
    await queryInterface.bulkInsert('Secretarias', [{
      name: 'Secretaria Municipal de Demo',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    const [secretarias] = await queryInterface.sequelize.query("SELECT id FROM Secretarias WHERE name = 'Secretaria Municipal de Demo';");
    const secretariaId = secretarias[0].id;

    // Insert Escola and get its ID
    await queryInterface.bulkInsert('Escolas', [{
      name: 'Escola Alvorada',
      secretariaId: secretariaId,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    const [escolas] = await queryInterface.sequelize.query("SELECT id FROM Escolas WHERE name = 'Escola Alvorada';");
    const escolaId = escolas[0].id;

    // Insert Users
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Admin da Secretaria',
        email: 'sme@demo.gov.br',
        password: smePassword,
        role: 'secretariat_admin',
        secretariaId: secretariaId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Diretor da Escola Alvorada',
        email: 'diretor@alvorada.gov.br',
        password: diretorPassword,
        role: 'school_director',
        escolaId: escolaId,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    // The order is important here to avoid foreign key constraint errors
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Escolas', null, {});
    await queryInterface.bulkDelete('Secretarias', null, {});
  }
};
