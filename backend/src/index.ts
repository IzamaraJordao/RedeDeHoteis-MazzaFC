import express from 'express';
import helmet from 'helmet';
import logger from 'morgan';
import { sequelize } from './database';
import router from './routes';
// import compression from 'compression';
// import Handlebars from 'handlebars';


const app = express()

const port = 3000
app.use(logger('dev'))
app.use(helmet());
app.use(express.json())
try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

app.use(router)

app.listen(port, () => {
  console.log(`Process  on port ${port}`)
})

