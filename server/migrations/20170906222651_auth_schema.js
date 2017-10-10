var {EncodePassword} = require('../utils/auth');

const ADMIN_USER = process.env.ADMIN_USER;
const ADMIN_PASS  = process.env.ADMIN_PASS;
const PUBLIC_USER = process.env.PUBLIC_USER;
const PUBLIC_PASS = process.env.PUBLIC_PASS;

exports.up = function(knex, Promise) {

  // Table Schema --------------------------------------------------------------
  return Promise.all([
    knex.schema.createTable('auth', function (table) {
      table.increments('id')
      table.text('auth')
        .defaultTo('')
        .notNull()
      table.text('password')
        .defaultTo('');
      table.timestamps(true, true);
      table.boolean('active')
        .defaultTo(true);
    }),
  ])
  // Trigger if able -----------------------------------------------------------
  .then((res) => {
    if ( process.env.DB_CLIENT !== 'sqlite3' ) {
      return knex.schema.raw(`
        CREATE TRIGGER update_auth
        BEFORE UPDATE ON auth
        FOR EACH ROW EXECUTE PROCEDURE  update_modified_column();
        `)
    }
    else return Promise.resolve(true);
  })
  // Auth Data -----------------------------------------------------------------
  // Prepare Admin Auth
  .then((res) => {
    return EncodePassword(ADMIN_PASS);
  })
  .then((adminPassword) => {
    return knex('auth').insert({auth: ADMIN_USER, password: adminPassword});
  })
  // Prepare Public Auth
  .then((res) => {
    return EncodePassword(PUBLIC_USER);
  })
  .then((publicPassword) => {
    return knex('auth').insert({auth: PUBLIC_USER, password: publicPassword});
  })
  .then((res) => { return Promise.resolve(true) })

};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.raw(`DROP TABLE IF EXISTS user;`),
  ])
};
