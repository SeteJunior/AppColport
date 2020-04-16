
exports.up = function (knex) {
  return knex.schema.createTable('reports', function (table) {
    table.increments('id').primary();
    table.string('title', 255).notNullable();
    table.string('description', 255).notNullable();
    table.integer('qty_books').notNullable();
    table.decimal('total_value').notNullable();
    table.datetime('date').notNullable();

    table.string('user_id').notNullable();

    table.foreign('user_id').references('id').inTable('users');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('reports');
};
