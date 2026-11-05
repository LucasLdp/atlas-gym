'use strict'
const ShortUniqueId = require('short-unique-id')

const { randomUUID } = new ShortUniqueId({ length: 10 })

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // O login de alunos compara a senha em texto puro (auth.controller.storeUser).
    const users = [
      {
        user_uuid: randomUUID(),
        name: 'Carlos Oliveira',
        photo: null,
        sex: 'Masculino',
        age: 28,
        email: 'carlos@exemplo.com',
        phone: '+55 11 98765-4321',
        password: '123456',
        focus: 'Hipertrofia',
      },
      {
        user_uuid: randomUUID(),
        name: 'Maria Silva',
        photo: null,
        sex: 'Feminino',
        age: 25,
        email: 'maria@exemplo.com',
        phone: '+55 21 98765-4321',
        password: '123456',
        focus: 'Perder Peso',
      },
      {
        user_uuid: randomUUID(),
        name: 'João Batista',
        photo: null,
        sex: 'Masculino',
        age: 35,
        email: 'joao@exemplo.com',
        phone: '+55 31 98765-4321',
        password: '123456',
        focus: 'Resistência',
      },
      {
        user_uuid: randomUUID(),
        name: 'Ana Souza',
        photo: null,
        sex: 'Feminino',
        age: 30,
        email: 'ana@exemplo.com',
        phone: '+55 41 98765-4321',
        password: '123456',
        focus: 'Flexibilidade',
      },
      {
        user_uuid: randomUUID(),
        name: 'Pedro Rocha',
        photo: null,
        sex: 'Masculino',
        age: 22,
        email: 'pedro@exemplo.com',
        phone: '+55 51 98765-4321',
        password: '123456',
        focus: 'Reabilitação',
      },
      {
        user_uuid: randomUUID(),
        name: 'Sara Perez',
        photo: null,
        sex: 'Feminino',
        age: 27,
        email: 'sara@exemplo.com',
        phone: '+55 61 98765-4321',
        password: '123456',
        focus: 'Condicionamento',
      },
    ]

    await queryInterface.bulkInsert('users', users)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
  },
}
