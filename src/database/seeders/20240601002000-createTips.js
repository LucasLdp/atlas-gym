'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const [users] = await queryInterface.sequelize.query(
      'SELECT id, email FROM users ORDER BY id ASC',
    )
    const idByEmail = Object.fromEntries(users.map(u => [u.email, u.id]))

    const now = new Date()
    const tips = [
      { email: 'carlos@exemplo.com', tip: 'Manter a alimentação proteica é fundamental para hipertrofia muscular.' },
      { email: 'carlos@exemplo.com', tip: 'Não esqueça de fazer alongamentos pós-treino para evitar lesões.' },
      { email: 'maria@exemplo.com', tip: 'Reduzir carboidratos e aumentar frutas e vegetais ajuda no emagrecimento.' },
      { email: 'maria@exemplo.com', tip: 'Foco em cardio moderado e treinos intervalados são mais eficientes.' },
      { email: 'joao@exemplo.com', tip: 'Treinos de resistência exigem adequada recuperação entre séries.' },
      { email: 'pedro@exemplo.com', tip: 'A reabilitação devida após lesões evita sequelas permanentes.' },
      { email: 'pedro@exemplo.com', tip: 'Use cadeiras ergométricas para fortalecer a musculatura profunda.' },
      { email: 'ana@exemplo.com', tip: 'Flexibilidade é aliada à força; pratique yoga ou pilates regularmente.' },
    ]

    await queryInterface.bulkInsert(
      'tips',
      tips.map(t => ({ user_fk: idByEmail[t.email], tip: t.tip, updatedAt: now })),
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tips', null, {})
  },
}
