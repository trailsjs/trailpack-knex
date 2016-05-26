'use strict'

const _ = require('lodash')
const Service = require('trails-service')

/**
 * @module SchemaMigrationService
 * @description Schema Migrations
 */
module.exports = class SchemaMigrationService extends Service {

  /**
   * @param knex connection object
   *
   * Drop schema for a store
   */
  drop (knex, models) {
    return knex.transaction(txn => {
      return Promise.all(_.map(models, model => {
        this.app.log.debug('SchemaMigrationService: performing "drop" migration',
          'for model', model.getModelName())

        return txn.schema.dropTableIfExists(model.getTableName())
      }))
    })
  }

  /**
   * @param knex connection object
   *
   * Create schema for models in a store
   */
  create (knex, models) {
    return knex.transaction(txn => {
      return Promise.all(_.map(models, model => {
        this.app.log.debug('SchemaMigrationService: performing "create" migration',
          'for model', model.getModelName())

        return txn.schema.hasTable()
          .then(exists => {
            if (exists) return

            return txn.schema.createTable(model.getTableName(), table => {
              return model.constructor.schema(table)
            })
          })
      }))
    })
  }

  /**
   * Alter an existing schema
   */
  alter (knex, model) {
    throw new Error('trailpack-knex does not currently support migrate=alter')
  }
}

