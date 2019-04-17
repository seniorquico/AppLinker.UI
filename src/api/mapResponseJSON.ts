import { from, of, OperatorFunction, throwError } from 'rxjs'
import { map, mergeMap } from 'rxjs/operators'
import { ProblemDetails } from './ProblemDetails'
import { ProblemDetailsError } from './ProblemDetailsError'
import { ResponseError } from './ResponseError'

/**
 * Maps a `Response` to a tuple containing a parsed JSON document and the original `Response`.
 */
export const mapResponseJSON = <T>(): OperatorFunction<Response, [T | undefined, Response]> =>
  mergeMap((response: Response) => {
    if (response.ok) {
      if (response.status === 204) {
        return of<[undefined, Response]>([undefined, response])
      }

      let contentType = response.headers.get('content-type')
      if (contentType === 'application/json') {
        return from(response.json() as Promise<T>).pipe(map<T, [T, Response]>(body => [body, response]))
      }
    } else {
      let contentType = response.headers.get('content-type')
      if (contentType === 'application/problem+json') {
        return from(response.json() as Promise<ProblemDetails>).pipe(
          mergeMap(problemDetails => throwError(new ProblemDetailsError(problemDetails, response))),
        )
      }
    }

    return throwError(new ResponseError(response))
  })
