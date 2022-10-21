import { HttpError } from './httpError'

export class ValidationError extends HttpError {
  constructor(message: string) {
    super(message, 400)

    this.name = 'ValidationError'
  }
}
