import { Observable, SchedulerLike, Subscriber } from 'rxjs'

/**
 * Creates an observable that wraps a `fetch` request and manages cancellation and timeout.
 * @param fetch The `fetch` method used to make the request.
 * @param input The URL or `Request` object.
 * @param init The request options.
 * @param scheduler A `SchedulerLike` to use for scheduling the emission of notifications.
 * @returns The observable.
 */
export const fromFetch = (
  fetch: typeof window.fetch,
  input: string | Request,
  init?: RequestInit,
  scheduler?: SchedulerLike,
): Observable<Response> =>
  new Observable<Response>(observer => {
    let controller: AbortController | undefined
    if (window.AbortController) {
      controller = new AbortController()
      if (init === undefined) {
        init = {
          signal: controller.signal,
        }
      } else {
        init.signal = controller.signal
      }
    }

    // This is set on resolve, reject, or cancel (when unsubscribing from observable).
    let completed = false
    fetch(input, init)
      .then(response => {
        if (!completed) {
          completed = true

          if (scheduler) {
            scheduler.schedule(dispatchNext, 0, { observer, response })
            scheduler.schedule(dispatchComplete, 0, { observer })
          } else {
            dispatchNext({ observer, response })
            dispatchComplete({ observer })
          }
        }
      })
      .catch(error => {
        if (!completed) {
          completed = true

          if (scheduler) {
            scheduler.schedule(dispatchError, 0, { error, observer })
          } else {
            dispatchError({ error, observer })
          }
        }
      })

    return () => {
      if (!completed) {
        completed = true
        if (controller) {
          controller.abort()
        }
      }
    }
  })

function dispatchNext(state?: { observer: Subscriber<Response>; response: Response }) {
  if (state) {
    state.observer.next(state.response)
  }
}

function dispatchComplete(state?: { observer: Subscriber<Response> }) {
  if (state) {
    state.observer.complete()
  }
}

function dispatchError(state?: { error: Error; observer: Subscriber<Response> }) {
  if (state) {
    state.observer.error(state.error)
  }
}
