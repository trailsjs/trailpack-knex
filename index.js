'use strict'

const _ = require('lodash')
const knex = require('knex')
const DatastoreTrailpack = require('trailpack-datastore')

/**
 * Knex integration for Trails. Allows knex to read its configration from the
 * trails datastore config, and auto-migrate on startup.
 */
module.exports = class KnexTrailpack extends DatastoreTrailpack {

  /**
   * Ensure that this trailpack supports the configured migration
   */
  validate () {
    if (!_.includes([ 'none', 'drop', 'create' ], this.app.config.database.models.migrate)) {
      throw new Error('Migrate must be configured to either "create" or "drop"')
    }
  }

  configure () {
    this.app.config.database.orm = 'knex'
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
    this.defaultStore = this.stores[this.app.config.database.defaultStore]

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

    if (database.models.migrate == 'none') return

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

