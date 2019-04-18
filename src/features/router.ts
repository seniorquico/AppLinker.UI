import { createBrowserHistory, Location } from 'history'
import * as React from 'react'

export const history = createBrowserHistory()
const RouterContext = React.createContext<Location>(history.location)

export const push = (path: string, state?: any) => history.push(path, state)

export const replace = (path: string, state?: any) => history.replace(path, state)

export const Router = RouterContext.Provider

export const useRouter = () => React.useContext(RouterContext)
