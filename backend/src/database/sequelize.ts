import { Sequelize } from 'sequelize'
import * as dotenv from 'dotenv'


dotenv.config()

export const sequelize = new Sequelize({
  database: process.env.DB_DATABASE as string,
  username: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  host: process.env.DB_HOST as string,
  port: Number(process.env.DB_PORT as string),
  dialect: 'mysql',
})
