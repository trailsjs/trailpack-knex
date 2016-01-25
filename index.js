'use strict'

const _ = require('lodash')
const knex = require('knex')
const DatastoreTrailpack = require('trailpack-datastore')

module.exports = class KnexTrailpack extends DatastoreTrailpack {

  /**
   * Ensure that this trailpack supports the configured migration
   */
  validate () {
    if (!_.includes([ 'drop', 'create' ], this.app.config.database.models.migrate)) {
      throw new Error('Migrate must be configured to either "create" or "drop"')
    }
  }

  /**
   * Set the store property on each model
   */
  configure () {
  }

  /**
   * Initialize knex connections, and perform migrations.
   */
  initialize () {
    super.initialize()

    this.stores = _.mapValues(this.app.config.database.stores, (store, storeName) => {
      return {
        knex: knex(store),
        models: _.pickBy(this.app.models, { store: storeName })
      }
    })

    return this.migrate()
  }

  /**
   * Close all database connections
   */
  unload () {
    return Promise.all(
      _.map(this.stores, store => store.knex.destroy())
    )
  }

  constructor (app) {
    super(app, {
      config: require('./config'),
      api: require('./api'),
      pkg: require('./package')
    })
  }

  /**
   * Migrate schema according to the database configuration
   */
  migrate () {
    const SchemaMigrationService = this.app.services.SchemaMigrationService
    const database = this.app.config.database

    return Promise.all(
      _.map(this.stores, store => {
        if (database.models.migrate == 'drop') {
          return SchemaMigrationService.drop(store.knex, this.app.models)
        }
      }))
      .then(() => {
        return Promise.all(_.map(this.stores, store => {
          return SchemaMigrationService.create(store.knex, this.app.models)
        }))
      })
  }
}

