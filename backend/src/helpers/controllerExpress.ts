
import { Request, Response } from 'express'
import { DbError } from '../exceptions/dbError'
import { HttpError } from '../exceptions/httpError'
import { UseCase } from '../use-case/interface'
import { Auth } from './auth'


export function controllerExpress(useCase: UseCase <any, any, any, any>, isPublic: "PUBLIC" | "PRIVATE" = "PRIVATE") {
  
  return async (req: Request, res: Response) => {
    let dataToken = undefined

    
    try {
      if(isPublic === "PRIVATE"){
        dataToken = Auth(req.headers.authorization as string)
      }
      const response = await useCase.execute({
        body: req.body,  /// corpo da requisição
        params: req.params, //// apenas um parametro
        query: req.query, /// varios parametros
      }, dataToken)
      console.log(response)
      res.status(response.status).json(response.body)
    } catch (error) {
      
      if (error instanceof DbError || error instanceof HttpError) {
        res.status(error.code).json(error.message)
        return
      }
      console.error(JSON.stringify(error))
      res.status(500).json('Internal Server Error')
    }
  }
}
// controller express é um middleware que recebe um useCase e retorna uma função que recebe uma requisição e uma resposta