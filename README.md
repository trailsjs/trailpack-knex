# trailpack-knex

[![NPM version][npm-image]][npm-url]
[![Build status][ci-image]][ci-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Code Climate][codeclimate-image]][codeclimate-url]

Provides support for database queries and schema migrations via [knex.js](http://knexjs.org/).

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

## Contributing
We love contributions! Please check out our [Contributor's Guide](https://github.com/trailsjs/trails/blob/master/.github/CONTRIBUTING.md) for more
information on how our projects are organized and how to get started.

## License
[MIT](https://github.com/trailsjs/trails/blob/master/LICENSE)

<img src="http://i.imgur.com/dCjNisP.png">

[npm-image]: https://img.shields.io/npm/v/trailpack-knex.svg?style=flat-square
[npm-url]: https://npmjs.org/package/trailpack-knex
[ci-image]: https://img.shields.io/travis/trailsjs/trailpack-knex/master.svg?style=flat-square
[ci-url]: https://travis-ci.org/trailsjs/trailpack-knex
[daviddm-image]: http://img.shields.io/david/trailsjs/trailpack-knex.svg?style=flat-square
[daviddm-url]: https://david-dm.org/trailsjs/trailpack-knex
[codeclimate-image]: https://img.shields.io/codeclimate/github/trailsjs/trailpack-knex.svg?style=flat-square
[codeclimate-url]: https://codeclimate.com/github/trailsjs/trailpack-knex

