
exports.up = function(knex, Promise) {

  return Promise.all([
    knex.schema.createTable('users', function (table) {
      table.increments('id')
      table.text('username')
        .defaultTo('')
        .notNull()
      table.text('email')
        .defaultTo('')
        .notNull()
        .unique()
      table.text('token')
        .defaultTo('')
        .notNull()
      table.timestamps(true, true)
    }),
  ])
  then((res) => {
    knex.schema.raw(`
      CREATE TRIGGER update_customer_modtime
      BEFORE UPDATE ON users
      FOR EACH ROW EXECUTE PROCEDURE  update_modified_column();
    `)
  })

};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.raw(`DROP TABLE IF EXISTS user;`),
  ])
};
