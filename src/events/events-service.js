const EventsService = {
  getAllEvents(knex) {
    return knex.select('*').from('create_event')
  },

  addEvent(knex, newEvent) {
    console.log(newEvent)
    return knex
      .insert(newEvent)
      .into('create_event')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },

  getById(knex, id) {
    return knex
      .from('create_event')
      .select('*')
      .where('id', id)
      .first()
  },

  deleteEvent(knex, id) {
    return knex('create_event')
      .where({ id })
      .delete()
  },

  updateEvent(knex, id, newEventFields) {
    return knex('create_event')
      .where({ id })
      .update(newEventFields)
  },
}

module.exports = EventsService