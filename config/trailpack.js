/**
 * Trailpack Configuration
 *
 * @see {@link http://trailsjs.io/doc/trailpack/config}
 */
module.exports = {
  lifecycle: {
    initialize: {
      listen: [ ],
      emit: [ ]
    }
  },

  poolDefaults: {
    min: 1,
    max: 16
  }
}
