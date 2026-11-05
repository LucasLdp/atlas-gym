'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const [rows] = await queryInterface.sequelize.query(
      `SELECT w.id AS workout_id, w.type_workout, u.email
       FROM workouts w JOIN users u ON u.id = w.user_fk
       ORDER BY w.id ASC`,
    )
    const workoutId = (email, type) => {
      const found = rows.find(r => r.email === email && r.type_workout === type)
      return found ? found.workout_id : null
    }

    // Biblioteca de exercícios por tipo de treino
    const library = {
      A: [
        { name: 'Supino Reto', sets: 4, reps: 10, kg: '40', rest: '60s' },
        { name: 'Crucifixo', sets: 3, reps: 12, kg: '14', rest: '45s' },
        { name: 'Tríceps Pulley', sets: 4, reps: 12, kg: '25', rest: '45s' },
        { name: 'Desenvolvimento Militar', sets: 3, reps: 10, kg: '20', rest: '60s' },
        { name: 'Abdominal Crunch', sets: 3, reps: 20, kg: '0', rest: '30s' },
      ],
      B: [
        { name: 'Puxada Frontal', sets: 4, reps: 10, kg: '45', rest: '60s' },
        { name: 'Remada Curvada', sets: 4, reps: 10, kg: '35', rest: '60s' },
        { name: 'Rosca Direta', sets: 3, reps: 12, kg: '15', rest: '45s' },
        { name: 'Rosca Martelo', sets: 3, reps: 12, kg: '12', rest: '45s' },
        { name: 'Prancha', sets: 3, reps: 1, kg: '0', rest: '30s' },
      ],
      C: [
        { name: 'Agachamento Livre', sets: 4, reps: 10, kg: '60', rest: '90s' },
        { name: 'Leg Press', sets: 4, reps: 12, kg: '120', rest: '60s' },
        { name: 'Cadeira Extensora', sets: 3, reps: 15, kg: '40', rest: '45s' },
        { name: 'Mesa Flexora', sets: 3, reps: 12, kg: '35', rest: '45s' },
        { name: 'Panturrilha em Pé', sets: 4, reps: 20, kg: '50', rest: '30s' },
      ],
    }

    const inserts = []
    for (const w of rows) {
      const exercises = library[w.type_workout] || library.A
      exercises.forEach((ex, index) => {
        inserts.push({
          workout_fk: w.workout_id,
          exercise: index + 1,
          name: ex.name,
          sets: ex.sets,
          reps: ex.reps,
          kg: ex.kg,
          rest: ex.rest,
        })
      })
    }

    await queryInterface.bulkInsert('exercises', inserts)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('exercises', null, {})
  },
}
