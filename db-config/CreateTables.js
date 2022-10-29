const knex = require('knex');

export const optionsSQLite = {
  client: 'sqlite3',
  connection: {
    filename: './mibase.sqlite'
  }
};

export async function createTableMessages() {
  const knexInstance = knex(optionsSQLite) 
  try {
    const exist = await knexInstance.schema.hasTable('mensajes')
    if(exist) {
      console.log('La tabla mensajes ya existe.')
      return
    }
    await knexInstance.schema.createTable('mensajes', (table) => {
      table.string('email', 15).notNullable()
      table.timestamp('date').notNullable()
      table.string('message', 40).notNullable()
    })
    console.log('Tabla mensajes creada.')
  } catch (error) {
    console.error(error.message)
    throw error
  } finally {
    knexInstance.destroy() 
  }
}

export const optionsMySQL = {
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'mibase'
  }
};

export async function createTableProducts() {
  const knexInstance = knex(optionsMySQL) 
  try {
    const exist = await knexInstance.schema.hasTable('productos')
    if(exist) {
      console.log('La tabla productos ya existe.')
      return
    }
    await knexInstance.schema.createTable('productos', (table) => {
      table.increments('id').notNullable()
      table.string('title', 15).notNullable()
      table.float('price').notNullable()
      table.string('thumbnail', 40).notNullable()
      table.primary('id')
    })
    console.log('Tabla productos creada.')
  } catch (error) {
    console.error(error.message)
    throw error
  } finally {
    knexInstance.destroy() 
  }
}