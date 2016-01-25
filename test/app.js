'use strict'

const _ = require('lodash')
const smokesignals = require('smokesignals')
const Model = require('trails-model')

module.exports = _.defaultsDeep({
  pkg: {
    name: 'knex-trailpack-test'
  },
  api: {
    models: {
      User: class User extends Model {
        static schema (table) {
          table.increments('id').primary()
          table.string('username')
        }
      },
      Role: class Role extends Model {
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
        require('trailpack-core'),
        require('../') // trailpack-knex
      ]
    },
    database: {
      stores: {
        teststore: {
          client: 'sqlite3',
          connection: {
            filename: './testdb.sqlite'
          }
        }
      },
      models: {
        defaultStore: 'teststore',
        migrate: 'drop'
      }
    }
  }
}, smokesignals.FailsafeConfig)


