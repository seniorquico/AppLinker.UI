import { Observable, SchedulerLike } from 'rxjs'
import { fromFetch } from './fromFetch'
import { mapResponseJSON } from './mapResponseJSON'
import { retryWhenRateLimitExceeded } from './retryWhenRateLimitExceeded'
import { timeoutSafeMethods } from './timeoutSafeMethods'

const _fetch = (
  fetch: typeof window.fetch,
  input: string,
  init?: RequestInit & { timeout?: number },
  scheduler?: SchedulerLike,
): Observable<Response> =>
  fromFetch(fetch, input, init, scheduler).pipe(
    timeoutSafeMethods(input, init),
    retryWhenRateLimitExceeded(),
  )

const _fetchJSON = <T>(
  fetch: typeof window.fetch,
  input: string,
  init?: RequestInit & { timeout?: number },
  scheduler?: SchedulerLike,
): Observable<[T | undefined, Response]> => _fetch(fetch, input, init, scheduler).pipe(mapResponseJSON())

export const getJSON = <T>(
  fetch: typeof window.fetch,
  input: string,
  init?: RequestInit & { timeout?: number },
  scheduler?: SchedulerLike,
): Observable<[T | undefined, Response]> => _fetchJSON(fetch, input, { ...init, method: 'GET' }, scheduler)

export const patchJSON = <T>(
  fetch: typeof window.fetch,
  input: string,
  init?: RequestInit & { timeout?: number },
  scheduler?: SchedulerLike,
): Observable<[T | undefined, Response]> => _fetchJSON(fetch, input, { ...init, method: 'PATCH' }, scheduler)

export const postJSON = <T>(
  fetch: typeof window.fetch,
  input: string,
  init?: RequestInit & { timeout?: number },
  scheduler?: SchedulerLike,
): Observable<[T | undefined, Response]> => _fetchJSON(fetch, input, { ...init, method: 'POST' }, scheduler)
