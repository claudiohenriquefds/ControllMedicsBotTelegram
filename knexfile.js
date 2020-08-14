module.exports = {

    development: {
      client: 'sqlite3',
      connection: {
        filename: './src/database/database.sqlite'
      },
    migrations: {
      directory: './src/database/migrations'
      },
    useNullAsDefault: true,
    },
  
    staging: {
      client: 'postgresql',
      connection: {
        database: 'my_db',
        user:     'username',
        password: 'password'
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'knex_migrations'
      }
    },
  
    production: {
      client: 'postgresql',
      connection: {
        database: process.env.DB_NAME,
        user:     process.env.DB_USER,
        password: process.env.DB_PASSWORD
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: './src/database/migrations'
      },
      useNullAsDefault: true,
    }
  
  };