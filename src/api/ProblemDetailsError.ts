import { ProblemDetails } from './ProblemDetails'
import { ResponseError } from './ResponseError'

export class ProblemDetailsError extends ResponseError {
  constructor(readonly details: ProblemDetails, response: Response, message?: string) {
    super(response, message)
    Object.setPrototypeOf(this, new.target.prototype)
  }
}
