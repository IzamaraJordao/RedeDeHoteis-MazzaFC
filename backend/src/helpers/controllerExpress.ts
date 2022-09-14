import { Request, Response } from 'express'
import { DbError } from '../exceptions/dbError'
import { HttpError } from '../exceptions/httpError'
import { UseCase } from '../use-case/interface'

export function controllerExpress(useCase: UseCase <any, any, any, any>) {
  return async (req: Request, res: Response) => {
    try {
      const response = await useCase.execute({
        body: req.body,  /// corpo da requisição
        params: req.params, //// apenas um parametro
        query: req.query, /// varios parametros
      })
      res.status(response.status).json(response.body)
    } catch (error) {
      if (error instanceof DbError || error instanceof HttpError) {
        res.status(error.code).json(error.message)
        return
      }
      console.error(error)
      res.status(500).json('Internal Server Error')
    }
  }
}
