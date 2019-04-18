import React from 'react'
import ReactDOM from 'react-dom'
import { push } from './features/router'
import { History } from './History'
import './index.css'
import * as serviceWorker from './serviceWorker'
import { Shell } from './Shell'

const app = ReactDOM.unstable_createRoot(document.getElementById('root'))
app.render(
  <React.StrictMode>
    <Shell />
    <hr />
    <ul>
      <li
        onClick={() => {
          push('/home')
        }}
      >
        Home
      </li>
      <li
        onClick={() => {
          push('/about')
        }}
      >
        About
      </li>
      <li
        onClick={() => {
          push('/contact')
        }}
      >
        Contact
      </li>
    </ul>
    <hr />
    <History />
  </React.StrictMode>,
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
