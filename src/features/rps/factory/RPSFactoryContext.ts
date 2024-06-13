import { createContext } from 'react'

export interface IRPSFactoryContext {
  /**
   *  Address of the `RPSFactory` contract.
   */
  address?: Address

  /**
   *  Address of the related source token contract.
   */
  source?: Address
}

export const RPSFactoryContext = createContext<IRPSFactoryContext>({})

RPSFactoryContext.displayName = 'RPSFactoryContext'
