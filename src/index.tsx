import { createBrowserHistory } from 'history'
import React from 'react'
import ReactDOM from 'react-dom'
import { Location } from './components/Location'
import { Navigation } from './components/Navigation'
import { Router } from './features'
import './index.css'
import * as serviceWorker from './serviceWorker'
import { Shell } from './Shell'

const history = createBrowserHistory()

const app = ReactDOM.unstable_createRoot(document.getElementById('root'))
app.render(
  <React.StrictMode>
    <Router history={history}>
      <Navigation />
      <hr />
      <Location />
      <hr />
      <Shell />
    </Router>
  </React.StrictMode>,
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
