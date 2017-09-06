
exports.up = function(knex, Promise) {

  return Promise.all([
    knex.schema.createTable('destiny', function (table) {
      table.increments('id');
      table.text('title')
        .defaultTo('')
        .notNull()
    }),
  ])

};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.raw(`DROP TABLE IF EXISTS destiny;`),
  ])
};
