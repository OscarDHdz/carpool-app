
exports.up = function(knex, Promise) {

  return Promise.all([
    knex.schema.createTable('trips', function (table) {
      table.increments('id');
      table.integer('user_id')
        .references('id')
        .inTable('users')
      table.integer('destiny_id')
        .references('id')
        .inTable('destinies')
      table.decimal('cost')
        .defaultTo(0)
        .notNull()
      table.boolean('payed')
        .defaultTo(false)
        .notNull()
      table.timestamp('date')
        .defaultTo(knex.fn.now())
        .notNull()
      table.timestamps(true)
    }),
  ])
  .then((res) => {
    knex.schema.raw(`
      CREATE TRIGGER update_customer_modtime
      BEFORE UPDATE ON trips
      FOR EACH ROW EXECUTE PROCEDURE  update_modified_column();
    `)
  })

};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.raw(`DROP TABLE IF EXISTS trips;`),
  ])
};
