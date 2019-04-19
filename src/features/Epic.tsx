import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { empty, interval, queueScheduler, Subject, zip } from 'rxjs'
import { observeOn, switchMap } from 'rxjs/operators'

function useEpic(epic, subscriber, inputs = []) {
  // holds the latest values for dependencies & epic subscriber
  let inputs$Ref = useRef([])
  let subscriberRef = useRef(subscriber)

  useEffect(() => {
    subscriberRef.current = subscriber
  }, [subscriber])

  useEffect(() => {
    inputs.forEach(d => {
      const input$ = new Subject().pipe(observeOn(queueScheduler))
      inputs$Ref.current.push(input$)
    })
    const effect$ = epic(...inputs$Ref.current)
    const subscription = effect$.subscribe({
      next: x => subscriberRef.current.next(x),
      error: e => subscriberRef.current.error(e),
      complete: () => subscriberRef.current.complete(),
    })
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    inputs.forEach((d, i) => inputs$Ref.current[i].next(d))
    return () => {}
  }, inputs)
}

function useToggle(b) {
  const [isToggled, setToggled] = useState(b)
  return [isToggled, () => setToggled(!isToggled)]
}

function App() {
  const [count, setCount] = useState(0)
  const [delay, setDelay] = useState(500)
  const [isPaused, togglePause] = useToggle(false)

  useEpic(
    // Epic function -> map input streams to output streams
    (delay$, isPaused$) =>
      zip(delay$, isPaused$).pipe(
        switchMap(([delay, isPaused]) => {
          console.log('new values', delay, isPaused)
          return isPaused ? empty() : interval(delay)
        }),
      ),
    // subscribe to output streams from epic functions
    // note the setCount function uses latest value from the scope
    {
      next: () => setCount(count + 1),
    },
    // dependencies will be feeded to input streams
    [delay, isPaused],
  )

  return (
    <div className="App">
      <h2>Count : {count}</h2>
      <p>Delay ({delay / 1000} seconds)</p>
      <input type="range" min="0" max="2000" step="100" value={delay} onChange={e => setDelay(+e.target.value)} />
      <p />
      <button onClick={togglePause}>{isPaused ? 'Resume' : 'Pause'}</button>
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
