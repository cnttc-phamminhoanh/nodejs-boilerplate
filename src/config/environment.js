import 'dotenv/config'

export const env = {
  MONGO_DB_URI: process.env.MONGO_DB_URI,
  MONGO_DB_DATABASE_NAME: process.env.DATABASE_NAME,
  MONGO_DB_USERNAME: process.env.MONGO_DB_USERNAME,
  MONGO_DB_PASSWORD: process.env.MONGO_DB_PASSWORD,
  APP_HOST: process.env.APP_HOST,
  APP_PORT: process.env.APP_PORT,
  BUILD_MODE: process.env.BUILD_MODE
}
