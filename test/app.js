const _ = require('lodash')
const smokesignals = require('smokesignals')
const Model = require('trails/lib/Model')

module.exports = _.defaultsDeep({
  pkg: {
    name: 'knex-trailpack-test'
  },
  api: {
    models: {
      User: class User extends Model {
        static config () {
          return {
            store: 'teststore'
          }
        }
        static schema (table) {
          table.increments('id').primary()
          table.string('username')
        }
      },
      Role: class Role extends Model {
        static config () {
          return {
            store: 'teststore'
          }
        }
        static schema (table) {
          table.increments('id').primary()
          table.string('username')
        }
      }
    }
  },
  config: {
    log: {
      logger: new smokesignals.Logger('error')
    },
    main: {
      packs: [
        require('../') // trailpack-knex
      ]
    },
    stores: {
      teststore: {
        migrate: 'drop',
        client: 'sqlite3',
        connection: {
          filename: './testdb.sqlite'
        }
      }
    }
  }
}, smokesignals.FailsafeConfig)


