import { Action } from './types'

/**
 * Identifies an action that decrements the counter.
 */
export const DECREMENT = 'DECREMENT'

/**
 * Represents an action that decrements the counter.
 */
export interface DecrementAction extends Action {
  readonly type: typeof DECREMENT
  readonly payload: {
    readonly value: number
  }
}

/**
 * Creates an action that decrements the counter.
 * @param value The value to decrement from the counter.
 * @returns The action.
 */
export const decrement = (value: number): DecrementAction => ({
  type: DECREMENT,
  payload: {
    value,
  },
})

/**
 * Identifies an action that increments the counter.
 */
export const INCREMENT = 'INCREMENT'

/**
 * Represents an action that increments the counter.
 */
export interface IncrementAction extends Action {
  type: typeof INCREMENT
  payload: {
    value: number
  }
}

/**
 * Creates an action that increments the counter.
 * @param value The value to increment from the counter.
 * @returns The action.
 */
export const increment = (value: number): IncrementAction => ({
  type: INCREMENT,
  payload: {
    value,
  },
})

/**
 * Represents the counter module actions.
 */
export type Actions = DecrementAction | IncrementAction
