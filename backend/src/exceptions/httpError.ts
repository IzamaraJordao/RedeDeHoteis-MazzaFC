
export class HttpError extends Error {
    code: number
    
    constructor(message: string,code: number) {
      super(message)
      this.code = code || 500
      this.name = 'HttpError'
    }
  }
  