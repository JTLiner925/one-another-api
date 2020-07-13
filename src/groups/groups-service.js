const GroupsService = {
  getAllGroups(knex) {
    return knex.select("*").from("one_another_groups");
  },

  addGroup(knex, newGroup) {
    console.log(newGroup);
    return knex
      .insert(newGroup)
      .into("one_another_groups")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },

  getById(knex, id) {
    return knex.from("one_another_groups").select("*").where("id", id).first();
  },

  deleteGroup(knex, id) {
    return knex("one_another_groups").where({ id }).delete();
  },

  updateGroup(knex, ids, groupName) {
    return knex("one_another_groups")
      .where("group_name", "=", groupName)
      .update({ user_ids: ids });
  },
};

module.exports = GroupsService;
