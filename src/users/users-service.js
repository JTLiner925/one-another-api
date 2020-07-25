const UsersService = {
  getAllUsers(knex) {
    return knex.select('*').from('one_another_users')
  },

  addUser(knex, newUser) {
    return knex
      .insert(newUser)
      .into('one_another_users')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },

  getByEmail(knex, email) {
    return knex
      .from('one_another_users')
      .select('*')
      .where('user_email', email)
      .first()
  },
  getById(knex, id) {
    return knex
      .from('one_another_users')
      .select('first_name', 'last_name')
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