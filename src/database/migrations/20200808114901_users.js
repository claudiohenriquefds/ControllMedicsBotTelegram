
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('user_id').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
