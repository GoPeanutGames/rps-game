import { createContext } from 'react'

export interface IRPSContext {
  /**
   *  Address of the `RPS` (game) contract.
   */
  address?: Address
}

export const RPSContext = createContext<IRPSContext>({})

RPSContext.displayName = 'RPSContext'
