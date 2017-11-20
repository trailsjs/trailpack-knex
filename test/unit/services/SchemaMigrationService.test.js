/* global describe, it */

const _ = require('lodash')
const assert = require('assert')

describe('SchemaMigrationService', () => {
  it('should exist', () => {
    assert(global.app.api.services['SchemaMigrationService'])
  })
  describe('#create', () => {
    it('should create tables', () => {
      return Promise.all(_.map(global.app.models, model => {
        console.log('store', model.store)
        const store = global.app.packs.knex.stores[model.store]

        console.log('created table?', model.getTableName())
        return store.knex.schema.hasTable(model.getTableName())
          .then(exists => {
            console.log('table exists?', exists)
            return exists ? Promise.resolve() : Promise.reject()
          })
      }))
    })
  })
})
