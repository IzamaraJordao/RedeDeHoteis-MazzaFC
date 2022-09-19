import serverless from 'serverless-http'
import express, { Request, Response } from 'express'
import Handlebars from 'handlebars'

import fs from 'fs'
const compression = require('compression')

const app = express()

app.use(express.json())

app.use(compression())
app.use('/public', express.static(__dirname + '../views'))

app.get('/docs', async (req: Request, res: Response) => {
  const viewFilePreRegisterDrugstore = (
    await fs.readFileSync(`${__dirname}/../views/open-api-page.hbs`)
  ).toString()

  const template = Handlebars.compile(viewFilePreRegisterDrugstore)

  return res.send(template({}))
})
app.get('/public/:name', async (req: Request, res: Response) => {
  console.log('teste')

  const fileName = req.params.name
  if (fileName == 'redoc.js') {
    const redoc = (
      await fs.readFileSync(`${__dirname}/../views/redoc.js`)
    ).toString()
    return res.send(Buffer.from(redoc))
  }
  if (fileName == 'openAPI.yml') {
    const openApi = (
      await fs.readFileSync(`${__dirname}/../views/openAPI.yml`)
    ).toString()
    return res.send(Buffer.from(openApi))
  }
  if (fileName == 'redoc.standalone.js.map') {
    const standalone = (
      await fs.readFileSync(`${__dirname}/../views/redoc.standalone.js.map`)
    ).toString()
    return res.send(Buffer.from(standalone))
  }
  return res.status(404).send()
})

export const handler = serverless(app)
