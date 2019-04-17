export class ResponseError extends Error {
  constructor(readonly response: Response, message?: string) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
  }
}
