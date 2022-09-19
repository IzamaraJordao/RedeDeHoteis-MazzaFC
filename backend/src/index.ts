// import express, { Request, Response } from 'express';
import express from 'express';
import helmet from 'helmet';
import logger from 'morgan';
import router from './routes';
// import compression from 'compression';
// import Handlebars from 'handlebars';
// import fs from 'fs';


const app = express()

const port = 4000;
app.use(logger('dev'))
app.use(helmet());
app.use(express.json());
app.use(router);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})



// app.use(compression())
// const publicDir = __dirname + '\\use-case\\docs\\views'
// app.use('/public', express.static(publicDir))

// app.get('/docs', async (req: Request, res: Response) => {
//   const viewFilePreRegisterDrugstore = (
//     await fs.readFileSync(`${publicDir}\\open-api-page.hbs`)
//   ).toString()

//   const template = Handlebars.compile(viewFilePreRegisterDrugstore)

//   return res.send(template({}))
// })
// app.get('/public/:name', async (req: Request, res: Response) => {
//   console.log('teste')

  // const fileName = req.params.name
  // if (fileName == 'redoc.js') {
  //   const redoc = (
  //     await fs.readFileSync(`${publicDir}\\redoc.js`)
  //   ).toString()
  //   return res.send(Buffer.from(redoc))
  // }
  // if (fileName == 'redoc_init.js') {
  //   const redoc = (
  //     await fs.readFileSync(`${publicDir}\\redoc_init.js`)
  //   ).toString()
  //   return res.send(Buffer.from(redoc))
  // }
  // if (fileName == 'openAPI.yml') {
  //   const openApi = (
  //     await fs.readFileSync(`${publicDir}\\openAPI.yml`)
  //   ).toString()
  //   return res.send(Buffer.from(openApi))
  // }
  // if (fileName == 'redoc.standalone.js.map') {
  //   const standalone = (
  //     await fs.readFileSync(`${publicDir}\\redoc.standalone.js.map`)
  //   ).toString()
  //   return res.send(Buffer.from(standalone))
  // }
//   return res.status(404).send()
// })



