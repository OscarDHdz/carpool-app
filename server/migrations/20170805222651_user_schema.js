
exports.up = function(knex, Promise) {

  return Promise.all([
    knex.schema.createTable('user', function (table) {
      table.increments('id')
      table.text('username')
        .defaultTo('')
        .notNull()
      table.text('email')
        .defaultTo('')
        .notNull()
      table.text('token')
        .defaultTo('')
        .notNull()
    }),
  ])

};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.raw(`DROP TABLE IF EXISTS user;`),
  ])
};
