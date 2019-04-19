import classNames from 'classnames'
import * as React from 'react'
import { useRouter, useRouterLocation } from '../features'
import './Navigation.css'

export const Navigation = () => {
  const [push] = useRouter()
  const location = useRouterLocation()
  return (
    <ul>
      <li
        className={classNames({ 'Navigation-current': location.pathname === '/home' })}
        onClick={() => {
          push('/home')
        }}
      >
        Home
      </li>
      <li
        className={classNames({ 'Navigation-current': location.pathname === '/about' })}
        onClick={() => {
          push('/about')
        }}
      >
        About
      </li>
      <li
        className={classNames({ 'Navigation-current': location.pathname === '/contact' })}
        onClick={() => {
          push('/contact')
        }}
      >
        Contact
      </li>
    </ul>
  )
}
