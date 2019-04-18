import * as React from 'react'
import { useRouter } from './features/router'

export const Location = () => {
  const location = useRouter()

  return (
    <ul>
      <li>Hash: {location.hash}</li>
      <li>Hash: {location.key}</li>
      <li>Hash: {location.pathname}</li>
      <li>Hash: {location.search}</li>
      <li>Hash: {location.state}</li>
    </ul>
  )
}
