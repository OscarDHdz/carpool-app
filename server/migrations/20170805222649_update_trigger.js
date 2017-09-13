
exports.up = function(knex, Promise) {

  if ( process.env.DB_CLIENT === 'sqlite3' )
    return Promise.resolve()
  else
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
  if ( process.env.DB_CLIENT === 'sqlite3' )
    return Promise.resolve();
  else
    return Promise.all([
      knex.schema.raw(`DROP FUNCTION IF EXISTS update_modified_column();`),
    ])
};
