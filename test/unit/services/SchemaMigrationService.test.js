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
        const store = global.app.packs.knex.stores[model.store]

        return store.knex.schema.hasTable(model.getTableName())
          .then(exists => {
            return exists ? Promise.resolve() : Promise.reject()
          })
      }))
    })
  })
})
