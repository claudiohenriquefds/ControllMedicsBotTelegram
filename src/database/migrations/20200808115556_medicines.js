
exports.up = function(knex) {
    return knex.schema.createTable('medicines', table => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
        table.string('medicine').notNullable();
        table.integer('amount').notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('medicines');
};