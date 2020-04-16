
exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.string('id', 255).primary();
    table.string('first_name', 255).notNullable();
    table.string('last_name', 255).notNullable();
    table.string('email', 255).notNullable();
    table.string('phone', 255).notNullable();
    table.string('segment', 255).notNullable();
    table.string('leader_name', 255).notNullable();
    table.string('campaign_name', 255).notNullable();
    table.string('username', 255).notNullable();
    table.string('password', 255).notNullable();
    table.string('access_level', 255);
    table.string('status', 255);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
