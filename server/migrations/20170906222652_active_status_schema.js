
exports.up = function(knex, Promise) {

  return Promise.all([
    knex.schema.table('users', function (table) {
      table.boolean('active')
      .defaultTo(true);
    }),
    knex.schema.table('trips', function (table) {
      table.boolean('active')
      .defaultTo(true);
    }),
  ])

};

exports.down = function(knex, Promise) {
  return Promise.resolve();
};
