/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('users', {
    id: {
      type: 'SERIAL',
      primaryKey: true
    },
    nama: {
      type: 'VARCHAR(128)',
      notNull: true
    },
    email: {
      type: 'VARCHAR(128)',
      notNull: true
    },
    npp: {
      type: 'VARCHAR(16)',
      notNull: true
    },
    npp_supervisor: {
      type: 'VARCHAR(16)',
      notNull: true
    },
    password: {
      type: 'TEXT',
      notNull: true
    }
  })
};

exports.down = (pgm) => {
  pgm.dropTable('users')
};
