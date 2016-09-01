'use strict'

const assert = require('assert')

describe('Knex Trailpack', () => {
  describe('#configure', () => {
    it('should set default pool config if not set', () => {
      const stores = global.app.config.database.stores
      assert(stores.teststore.pool)
      assert(stores.teststore.pool.min > 0)
      assert(stores.teststore.pool.max > 0)
    })
  })
  describe('#initialize', () => {
    it('should group stores and models', () => {
      const stores = global.app.packs.knex.stores
      assert(stores.teststore)
      assert(stores.teststore.models)
      assert.equal(stores.teststore.models.user)
      assert.equal(stores.teststore.models.user)
    })
  })
})
