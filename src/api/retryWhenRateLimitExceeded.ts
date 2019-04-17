import { DateTime } from 'luxon'
import { MonoTypeOperatorFunction, of, throwError } from 'rxjs'
import { concatMap, delay, retryWhen } from 'rxjs/operators'
import { ResponseError } from './ResponseError'

export const retryWhenRateLimitExceeded = <T>(): MonoTypeOperatorFunction<T> =>
  retryWhen<T>(error$ =>
    error$.pipe(
      concatMap(error => {
        if (error instanceof ResponseError) {
          if (error.response.status === 429 || error.response.status === 503) {
            if (error.response.headers.has('retry-after')) {
              const retryAfter = error.response.headers.get('retry-after') || ''
              let retryAfterDelay: number

              const retryAfterDateTime = DateTime.fromHTTP(retryAfter)
              if (retryAfterDateTime.isValid) {
                retryAfterDelay = retryAfterDateTime.diffNow('milliseconds').milliseconds
                if (retryAfterDelay < 0) {
                  retryAfterDelay = 0
                }
              } else {
                retryAfterDelay = parseInt(retryAfter)
                if (isNaN(retryAfterDelay) || retryAfterDelay < 0) {
                  retryAfterDelay = 0
                }
              }

              if (retryAfterDelay > 0) {
                // Retry after delay
                return of(error).pipe(delay(retryAfterDelay))
              }
            }

            // Retry immediately
            return of(error)
          }
        }

        // Propagate error
        return throwError(error)
      }),
    ),
  )
