import { createBrowserHistory, createMemoryHistory, History } from 'history'
import * as React from 'react'
import { Router } from '../features'

export const RouterWrapper: React.FunctionComponent = ({ children }) => {
  const [history, setHistory] = React.useState<History>(createBrowserHistory())
  const selectBrowserHistory = React.useCallback(() => {
    setHistory(createBrowserHistory())
  }, [])
  const selectMemoryHistory = React.useCallback(() => {
    setHistory(createMemoryHistory())
  }, [])
  return (
    <>
      <ul>
        <li onClick={selectBrowserHistory}>Browser</li>
        <li onClick={selectMemoryHistory}>Memory</li>
      </ul>
      <hr />
      <Router history={history}>{children}</Router>
    </>
  )
}
