import dotenv from 'dotenv'
dotenv.config()

const config = {
  env: 'dev',
  port: process.env.PORT || process.env.LOCAL_PORT,
}

const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
}

const secretKey = process.env.SECRET_KEY

export {
  config,
  dbConfig,
  secretKey,
}