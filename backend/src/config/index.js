import dotenv from 'dotenv'
dotenv.config()

const config = {
  env: 'dev',
  port: process.env.PORT || process.env.LOCAL_PORT,
}

export {
  config,
}