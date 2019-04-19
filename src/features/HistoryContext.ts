import { History } from 'history'
import * as React from 'react'

const context = React.createContext<History | undefined>(undefined)

export const HistoryProvider = context.Provider as React.Provider<History>

export const useRouter = () => {
  const history = React.useContext(context)
  if (history === undefined) {
    throw new TypeError('Failed to find history in the current component context.')
  }

  return [history.push, history.replace]
}
