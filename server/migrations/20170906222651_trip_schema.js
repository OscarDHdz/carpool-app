
exports.up = function(knex, Promise) {

  return Promise.all([
    knex.schema.createTable('trip', function (table) {
      table.increments('id');
      table.integer('user_id')
        .references('id')
        .inTable('user')
      table.integer('destiny_id')
        .references('id')
        .inTable('destiny')
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
      BEFORE UPDATE ON trip
      FOR EACH ROW EXECUTE PROCEDURE  update_modified_column();
    `)
  })

};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.raw(`DROP TABLE IF EXISTS trip;`),
  ])
};
