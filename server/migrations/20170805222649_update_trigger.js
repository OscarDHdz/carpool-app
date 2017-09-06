
exports.up = function(knex, Promise) {

  return Promise.all([
    knex.schema.raw(`
      CREATE OR REPLACE FUNCTION update_modified_column()
      RETURNS TRIGGER AS $$
      BEGIN
          NEW.updated_at = now();
          RETURN NEW;
      END;
      $$ language 'plpgsql';
      `)
  ])

};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.raw(`DROP FUNCTION IF EXISTS update_modified_column();`),
  ])
};
