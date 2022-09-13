import express from 'express';
import helmet from 'helmet';
import logger from 'morgan';
import router from './routes';

const app = express()

const port = 3000
app.use(logger('combined'))
app.use(helmet());
app.use(express.json())
app.use(router)


app.listen(port, () => {
  console.log(`Process  on port ${port}`)
})
