/**
 * Trailpack Configuration
 *
 * @see {@link http://trailsjs.io/doc/trailpack/config
 */
module.exports = {
  lifecycle: {
    initialize: {
      listen: [
        'trailpack:datastore:initialized'
      ],
      emit: [ ]
    }
  }
}
