'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const [users] = await queryInterface.sequelize.query(
      'SELECT id, email FROM users ORDER BY id ASC',
    )
    const idByEmail = Object.fromEntries(users.map(u => [u.email, u.id]))

    const now = new Date()
    const workouts = [
      { email: 'carlos@exemplo.com', type: 'A' },
      { email: 'carlos@exemplo.com', type: 'B' },
      { email: 'carlos@exemplo.com', type: 'C' },
      { email: 'maria@exemplo.com', type: 'A' },
      { email: 'maria@exemplo.com', type: 'B' },
      { email: 'joao@exemplo.com', type: 'A' },
      { email: 'joao@exemplo.com', type: 'B' },
      { email: 'ana@exemplo.com', type: 'A' },
      { email: 'pedro@exemplo.com', type: 'A' },
      { email: 'pedro@exemplo.com', type: 'B' },
      { email: 'sara@exemplo.com', type: 'A' },
    ]

    await queryInterface.bulkInsert(
      'workouts',
      workouts.map(w => ({ user_fk: idByEmail[w.email], type_workout: w.type, createdAt: now })),
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('workouts', null, {})
  },
}
