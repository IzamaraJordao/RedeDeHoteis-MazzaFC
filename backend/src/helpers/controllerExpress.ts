import { Request, Response } from 'express'
import { DbError } from '../exceptions/dbError'
import { HttpError } from '../exceptions/httpError'
import { UseCase } from '../use-case/interface'
// import { tokenGenerator } from './tokenGenerator' 

export function controllerExpress(useCase: UseCase <any, any, any, any>, isPublic: "PUBLIC" | "PRIVATE" = "PRIVATE") {
  
  return async (req: Request, res: Response) => {
    let dataToken = null
    // if(isPublic === "PRIVATE") {
    //   try {
    //     const token =  req.headers.authorization 
    //     if(!token) {
    //       res.status(401).json("Token não informado")
    //       return
    //     } 
    //     dataToken = tokenGenerator.decode(token.replace("Bearer ", ""))

    //   } catch (error) {
    //     res.status(401).json("Token inválido")
    //   }
    // }
    try {
      const response = await useCase.execute({
        body: req.body,  /// corpo da requisição
        params: req.params, //// apenas um parametro
        query: req.query, /// varios parametros
      }, dataToken)
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
