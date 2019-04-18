import * as React from 'react'
import { empty, of, TimeoutError } from 'rxjs'
import { catchError, concatMap, map } from 'rxjs/operators'
import { getJSON } from './api'
import { ProblemDetailsError } from './api/ProblemDetailsError'
import { ResponseError } from './api/ResponseError'
import { FetchContext } from './FetchContext'

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_PROFILE':
      return action.payload.profile
    default:
      return state
  }
}

export const Shell = () => {
  const [state, dispatch] = React.useReducer(reducer, null)

  let fetch = React.useContext(FetchContext)
  React.useEffect(() => {
    /**
     * 200 OK with valid content JSON
     * http://www.mocky.io/v2/5cb0df8e3300006900571f24
     *
     * 200 OK with invalid content JSON
     * http://www.mocky.io/v2/5cb10c73330000930b571fbe
     *
     * 401 Unauthorized without problem details JSON
     * http://www.mocky.io/v2/5cb10c323300003f09571fbd
     *
     * 404 Not Found with valid problem details JSON
     * http://www.mocky.io/v2/5cb11de9330000960c571fea
     *
     * 404 Not Found with invalid problem details JSON
     * http://www.mocky.io/v2/5cb11dfd330000530d571feb
     */
    const subscription = of(
      ['Success (200)', 'http://www.mocky.io/v2/5cb0df8e3300006900571f24'],
      ['TimeoutError', 'http://www.mocky.io/v2/5cb0df8e3300006900571f24'],
      ['SyntaxError', 'http://www.mocky.io/v2/5cb10c73330000930b571fbe'],
      ['ResponseError (401)', 'http://www.mocky.io/v2/5cb10c323300003f09571fbd'],
      ['ProblemDetailsError (404)', 'http://www.mocky.io/v2/5cb11de9330000960c571fea'],
      ['SyntaxError', 'http://www.mocky.io/v2/5cb11dfd330000530d571feb'],
      ['TypeError', 'http://www.mocky-invalid.io/v2/5cb11dfd330000530d571feb'],
    )
      .pipe(
        concatMap(([title, url], index) => {
          console.group('Request')
          console.info(title)
          return getJSON<{ name: string; email: string }>(
            fetch,
            url + '?mocky-delay=' + (index === 1 ? '2000ms' : '250ms'),
          ).pipe(
            map(([profile]) => {
              console.groupCollapsed('Success')
              console.info(profile)
              console.groupEnd()
              console.groupEnd()

              return {
                type: 'SET_PROFILE',
                payload: {
                  profile,
                },
              }
            }),
            catchError(error => {
              console.groupCollapsed('Error')
              console.error(error)

              console.info('instanceof Error === ' + (error instanceof Error))
              console.info('instanceof ProblemDetailsError === ' + (error instanceof ProblemDetailsError))
              console.info('instanceof ResponseError === ' + (error instanceof ResponseError))
              console.info('instanceof SyntaxError === ' + (error instanceof SyntaxError))
              console.info('instanceof TimeoutError === ' + (error instanceof TimeoutError))
              console.info('instanceof TypeError === ' + (error instanceof TypeError))

              console.groupEnd()
              console.groupEnd()
              return empty()
            }),
          )
        }),
      )
      .subscribe(action => dispatch(action))

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  if (state == null) {
    return <p>Loading...</p>
  }

  return (
    <>
      <h1>Hello, {state.name}!</h1>
      <p>
        You can be reached at <a href={'mailto:' + state.email}>{state.email}</a>
      </p>
    </>
  )
}
