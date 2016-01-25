# trailpack-knex

[![NPM version][npm-image]][npm-url]
[![Build status][ci-image]][ci-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Code Climate][codeclimate-image]][codeclimate-url]

Provides support for database queries and schema migrations via [knex.js](http://knexjs.org/).
Required by [trailpack-bookshelf](https://github.com/trailsjs/trailpack-bookshelf).

## Install

```sh
$ npm install --save trailpack-knex
```

## Configure

#### `main.js`

```js
// config/main.js
module.exports = {
  packs: [
    // ... other trailpacks
    require('trailpack-knex')
  ]
}
```

#### `database.js`

```js
// config/database.js
module.exports = {
  stores: {
    knexPostgres: {
      client: 'pg',

      /**
       * knex connection object
       * see: http://knexjs.org/#Installation-client
       */
      connection: {
        host: 'localhost',
        user: 'admin',
        password: '1234',
        database: 'mydb'
      }
    }
  },

  /**
   * Supported Migrate Settings:
   * - drop
   * - create
   */
  migrate: 'create',
  defaultStore: 'knexPostgres'
}
```

## Usage

### Models

```js
// api/models/User.js
class User extends Model {
  static schema (table) {
    table.increments('id').primary()
    table.string('username')
    table.string('firstName')
    table.string('lastName')
  }
}

// api/models/Role.js
class Role extends Model {
  static schema (table) {
    table.increments('id').primary()
    table.string('name')
    table.integer('user_id').references('user.id')
  }
}
```

### Services

#### `SchemaMigrationService`

##### `create`
Create the schema using knex

##### `drop`
Drop the schema using knex

##### `alter`
Not currently supported.

[npm-image]: https://img.shields.io/npm/v/trailpack-knex.svg?style=flat-square
[npm-url]: https://npmjs.org/package/trailpack-knex
[ci-image]: https://img.shields.io/travis//trailpack-knex/master.svg?style=flat-square
[ci-url]: https://travis-ci.org//trailpack-knex
[daviddm-image]: http://img.shields.io/david//trailpack-knex.svg?style=flat-square
[daviddm-url]: https://david-dm.org//trailpack-knex
[codeclimate-image]: https://img.shields.io/codeclimate/github//trailpack-knex.svg?style=flat-square
[codeclimate-url]: https://codeclimate.com/github//trailpack-knex

