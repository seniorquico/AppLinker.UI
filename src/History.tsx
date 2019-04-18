import * as React from 'react'
import { history, Router } from './features/router'
import { Location } from './Location'

export const History = () => {
  const [location, setLocation] = React.useState(history.location)
  React.useEffect(
    () =>
      history.listen(location => {
        setLocation(location)
      }),
    [],
  )

  return (
    <>
      <h2>Router / History / Location</h2>
      <Router value={location}>
        <Location />
      </Router>
    </>
  )
}
