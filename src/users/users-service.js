const UsersService = {
  getAllUsers(knex) {
    return knex.select('*').from('one_another_users')
  },

  insertUser(knex, newUser) {
    return knex
      .insert(newUser)
      .into('one_another_users')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },

  getById(knex, id) {
    return knex
      .from('one_another_users')
      .select('*')
      .where('id', id)
      .first()
  },

  deleteUser(knex, id) {
    return knex('one_another_users')
      .where({ id })
      .delete()
  },

  updateUser(knex, id, newUserFields) {
    return knex('one_another_users')
      .where({ id })
      .update(newUserFields)
  },
}

module.exports = UsersService