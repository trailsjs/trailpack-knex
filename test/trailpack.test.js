const assert = require('assert')

describe('Knex Trailpack', () => {
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
