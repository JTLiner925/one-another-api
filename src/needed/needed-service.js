const NeededService = {
  getAllNeeded(knex, eventId) {
    return knex.select("*").from("needed_items");
  },

  addItem(knex, newItem) {
    return knex
      .insert(newItem)
      .into("needed_items")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },

  getById(knex, id) {
    return knex
      .from("one_another_users")
      .select("first_name", "last_name")
      .where("id", id)
      .first();
  },
  deleteItem(knex, id) {
    return knex("needed_items").where({ id }).delete();
  },

  updateItems(knex, id, newItemFields) {
    return knex("needed_items").where({ id }).update(newItemFields);
  },
};

module.exports = NeededService;
