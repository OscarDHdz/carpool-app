
exports.up = function(knex, Promise) {

  return Promise.all([
    knex.schema.createTable('users', function (table) {
      table.increments('id')
      table.text('username')
        .defaultTo('')
        .notNull()
      table.text('firstname')
        .defaultTo('')
        .notNull()
      table.text('lastname')
        .defaultTo('')
        .notNull()
      table.text('color')
        .defaultTo('')
        .notNull()
      table.text('email')
        .defaultTo('')
        .notNull()
        .unique();
      table.text('token')
        .defaultTo('');
      table.timestamps(true, true);
      table.boolean('active')
        .defaultTo(true);
      table.text('password')
        .notNull('');
    }),
  ])
  then((res) => {
    if ( process.env.DB_CLIENT !== 'sqlite3' )
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
