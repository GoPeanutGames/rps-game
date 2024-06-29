import { createContext } from 'react'

export interface IRPSFreeContext {
  /**
   *  Address of the `RPSFree` contract.
   */
  address?: Address
}

export const RPSFreeContext = createContext<IRPSFreeContext>({})

RPSFreeContext.displayName = 'RPSFreeContext'
