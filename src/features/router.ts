import { createBrowserHistory } from 'history'
import * as React from 'react'

export const history = createBrowserHistory()

export const HistoryContext = React.createContext(history.location)
