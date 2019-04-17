import { identity } from 'rxjs'
import { MonoTypeOperatorFunction } from 'rxjs/internal/types'
import { timeout } from 'rxjs/operators'

export const timeoutSafeMethods = <T>(
  input: string | Request,
  init?: RequestInit & { timeout?: number },
): MonoTypeOperatorFunction<T> => {
  const method = ((input && typeof input === 'object' && input.method) || (init && init.method) || 'GET').toUpperCase()
  if (method === 'GET' || method === 'HEAD') {
    let due = (init && init.timeout) || 10000
    if (!Number.isFinite(due) || due < 0) {
      due = 10000
    }

    return timeout(due)
  } else {
    return identity
  }
}
