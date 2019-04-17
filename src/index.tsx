import React from 'react'
import ReactDOM from 'react-dom'
import { history, HistoryContext } from './features/router'
import './index.css'
import * as serviceWorker from './serviceWorker'
import { Shell } from './Shell'

const app = ReactDOM.unstable_createRoot(document.getElementById('root'))
app.render(
  <React.StrictMode>
    <HistoryContext.Provider value={history.location}>
      <Shell />
    </HistoryContext.Provider>
  </React.StrictMode>,
)

history.listen(location => {
  app.render(
    <React.StrictMode>
      <HistoryContext.Provider value={location}>
        <Shell />
      </HistoryContext.Provider>
    </React.StrictMode>,
  )
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
