import * as React from 'react'

export const useStore = () => {
  React.useEffect(() => {})
}

// import * as React from 'react'
// import { Observable, queueScheduler, Subject, from } from 'rxjs'
// import { observeOn, mergeMap } from 'rxjs/operators'
// import { Actions } from './actions'
// import { reducer, State } from './reducers'

// class ActionsObservable extends Observable<Actions> {
//   constructor(actionsSubject) {
//     super();
//     this.source = actionsSubject;
//   }

//   lift(operator) {
//     const observable = new ActionsObservable(this);
//     observable.operator = operator;
//     return observable;
//   }
// }

// class StateObservable extends Observable<State> {
//   constructor(stateSubject, initialState) {
//     super(subscriber => {
//       const subscription = this.__notifier.subscribe(subscriber)
//       if (subscription && !subscription.closed) {
//         subscriber.next(this.value)
//       }
//       return subscription
//     })

//     this.value = initialState
//     this.__notifier = new Subject()
//     this.__subscription = stateSubject.subscribe(value => {
//       // We only want to update state$ if it has actually changed since
//       // redux requires reducers use immutability patterns.
//       // This is basically what distinctUntilChanged() does but it's so simple
//       // we don't need to pull that code in
//       if (value !== this.value) {
//         this.value = value
//         this.__notifier.next(value)
//       }
//     })
//   }
// }

// const QueueScheduler = queueScheduler.constructor
// const uniqueQueueScheduler = new QueueScheduler(queueScheduler.SchedulerAction)

// const epic = (state$: Observable<State>): Observable<Actions> => state$.pipe(
//   mergeMap(state => {

//   })
// )

// export const useStore = (): [State, React.Dispatch<Actions>] => {
//   const [state, dispatch] = React.useReducer(reducer, undefined)

//   const actionSubject$ = new Subject<Actions>()
//   const action$ = new ActionsObservable(actionSubject$.pipe(observeOn(uniqueQueueScheduler)))
//   const stateSubject$ = new Subject<State>()
//   const state$ = new StateObservable(stateSubject$.pipe(observeOn(uniqueQueueScheduler)), state)

//   const dispatchRef = React.useRef<React.Dispatch<Actions>>(action => {
//     dispatch(action)
//     // TODO: Publish to action$
//   })

//   React.useEffect(() => {
//     stateSubject$.next(state)
//   }, [state])

//   return [state, dispatchRef.current]
//   const stateObservables = useRef<[Subject<State>, Observable<State>] | null>(null)

//   useEffect(() => {
//     let stateSubject$: Subject<State>
//     if (stateObservables.current == null) {

//       stateObservables.current = [stateSubject$, state$]
//     } else {
//       stateSubject$ = stateObservables.current[0]
//     }

//     stateSubject$.next(state)
//   }, [state])
// }
