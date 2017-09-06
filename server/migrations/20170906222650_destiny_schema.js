
exports.up = function(knex, Promise) {

  return Promise.all([
    knex.schema.createTable('destiny', function (table) {
      table.increments('id');
      table.text('title')
        .defaultTo('')
        .notNull()
      table.timestamps(true)
    }),
  ])
  .then((res) => {
    knex.schema.raw(`
      CREATE TRIGGER update_customer_modtime
      BEFORE UPDATE ON destiny
      FOR EACH ROW EXECUTE PROCEDURE  update_modified_column();
    `)
  })

};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.raw(`DROP TABLE IF EXISTS destiny;`),
  ])
};
