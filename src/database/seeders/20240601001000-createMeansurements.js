'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const [users] = await queryInterface.sequelize.query(
      'SELECT id, email FROM users ORDER BY id ASC',
    )
    const idByEmail = Object.fromEntries(users.map(u => [u.email, u.id]))

    const measurements = [
      { email: 'carlos@exemplo.com', weight: 82.5, height: 1.75, rb: 38.2, lb: 37.8, waist: 85.0, rt: 56.0, lt: 55.5 },
      { email: 'maria@exemplo.com', weight: 65.3, height: 1.68, rb: 31.5, lb: 31.0, waist: 78.0, rt: 53.0, lt: 52.5 },
      { email: 'joao@exemplo.com', weight: 88.0, height: 1.80, rb: 42.0, lb: 41.5, waist: 92.0, rt: 60.0, lt: 59.5 },
      { email: 'ana@exemplo.com', weight: 62.0, height: 1.65, rb: 29.8, lb: 29.5, waist: 76.0, rt: 51.0, lt: 50.5 },
      { email: 'pedro@exemplo.com', weight: 75.0, height: 1.78, rb: 35.0, lb: 34.5, waist: 82.0, rt: 57.0, lt: 56.5 },
      { email: 'sara@exemplo.com', weight: 68.5, height: 1.70, rb: 33.0, lb: 32.5, waist: 79.0, rt: 54.0, lt: 53.5 },
    ]

    const now = new Date()
    await queryInterface.bulkInsert(
      'meansurements',
      measurements.map(m => ({
        user_fk: idByEmail[m.email],
        weight: m.weight,
        height: m.height,
        right_biceps: m.rb,
        left_biceps: m.lb,
        waist: m.waist,
        right_thigh: m.rt,
        left_thigh: m.lt,
        createdAt: now,
      })),
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('meansurements', null, {})
  },
}
