import mysql from 'mysql2'
import { dbConfig } from '#config/index.js'

const connection = mysql.createConnection({
  host: dbConfig.host,
  port: dbConfig.port,
  database: dbConfig.database,
  user: dbConfig.user,
  password: dbConfig.password,
})

connection.connect(function(error) {
  if (error) {
    throw new Error(error.message)
  } else {
    console.log('Connection established to MySQL server')
  }
})

export {
  connection,
}