'use strict'

const _ = require('lodash')
const Knex = require('knex')
const Trailpack = require('trailpack')

module.exports = class KnexTrailpack extends Trailpack {

  /**
   * Ensure that this trailpack supports the configured migration
   */
  validate () {
    if (!_.includes([ 'drop', 'create' ], this.app.config.database.models.migrate)) {
      throw new Error('Migrate must be configured to either "create" or "drop"')
    }
  }

  /**
   * TODO document method
   */
  configure () {

  }

  /**
   * Initialize knex connections, and perform migrations.
   */
  initialize () {
    const SchemaMigrationService = this.app.services.SchemaMigrationService
    const database = this.app.config.database
    this.connections = _.mapValues(database.stores, store => Knex(store))

    return Promise.all(
      _.map(this.connections, knex => {
        if (database.models.migrate == 'drop') {
          return SchemaMigrationService.drop(knex, this.app.models)
        }
      }))
      .then(() => {
        return Promise.all(_.map(this.connections, knex => {
          return SchemaMigrationService.create(knex, this.app.models)
        })
      })
  }

  constructor (app) {
    super(app, {
      config: require('./config'),
      api: require('./api'),
      pkg: require('./package')
    })
  }
}

