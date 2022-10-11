import { HTTP_STATUS } from "../helpers/httpStatus"

export class UnauthorizedError extends Error {
    code: HTTP_STATUS
    
    constructor(message: string) {
      super(message)
      this.code = 401
      this.name = 'UnauthorizedError'
    }
  }
  