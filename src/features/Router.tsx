import { History } from 'history'
import * as React from 'react'
import { HistoryProvider } from './HistoryContext'
import { LocationProvider } from './LocationContext'

export interface RouterProps {
  history: History
}

export const Router: React.FunctionComponent<RouterProps> = ({ children, history }) => {
  const [location, setLocation] = React.useState(history.location)
  React.useEffect(
    () =>
      history.listen(location => {
        setLocation(location)
      }),
    [history],
  )

  return (
    <HistoryProvider value={history}>
      <LocationProvider value={location}>{children}</LocationProvider>
    </HistoryProvider>
  )
}
