/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('epresence', {
    id: {
      type: 'SERIAL',
      primaryKey: true
    },
    id_users: {
      type: 'INTEGER',
      notNull: true
    },
    type: {
      type: 'VARCHAR(16)',
      notNull: true
    },
    is_approve: {
      type: 'BOOLEAN',
      notNull: false
    },
    waktu: {
      type: 'TEXT',
      notNull: true
    }
  })

  pgm.addConstraint('epresence', 'fk_epresence.id_users', 'FOREIGN KEY(id_users) REFERENCES users(id) ON DELETE CASCADE')
};

exports.down = (pgm) => {
  pgm.dropConstraint('epresence', 'fk_epresence.id_users')
  pgm.dropTable('epresence')
};
