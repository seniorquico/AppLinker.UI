import { Location } from 'history'
import * as React from 'react'

const context = React.createContext<Location | undefined>(undefined)

export const LocationProvider = context.Provider as React.Provider<Location>

export const useRouterLocation = () => {
  const location = React.useContext(context)
  if (location === undefined) {
    throw new TypeError('Failed to find location in the current component context.')
  }

  return location
}
