import { Actions, DECREMENT, INCREMENT } from './actions'

/**
 * Represents the state of the counter module.
 */
export interface State {
  readonly counter: number
}

/**
 * Manages the state of the counter module by reducing actions into the current state.
 * @param state The current state.
 * @param action The action.
 * @returns The new state.
 */
export const reducer = (state: State | undefined, action: Actions): State => {
  if (state === undefined) {
    state = {
      counter: 0,
    }
  }

  switch (action.type) {
    case DECREMENT:
      if (state.counter === 0) {
        return state
      }

      if (state.counter < action.payload.value) {
        return {
          counter: 0,
        }
      }

      return {
        counter: state.counter - action.payload.value,
      }
    case INCREMENT:
      return {
        counter: state.counter + action.payload.value,
      }
    default:
      return state
  }
}
