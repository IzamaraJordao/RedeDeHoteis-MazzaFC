import { HTTP_STATUS } from "../helpers/httpStatus"

export class DbError extends Error {
  code: HTTP_STATUS
  
  constructor(message: string,code?: HTTP_STATUS) {
    super(message)
    this.code = code || 500
    this.name = 'DbError'
  }
}

