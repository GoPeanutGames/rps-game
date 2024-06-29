import { createContext } from 'react'

export interface IRPSRouterContext {
  /**
   *  Address of the `RPSRouter` contract.
   */
  address?: Address

  /**
   *  Address of the `RPSFactory` contract.
   *
   *  NOTE: May be both: the original `RPSFactory` or `RPSFree` as it is the
   *        same contract with inheritance.
   */
  factory?: Address
}

export const RPSRouterContext = createContext<IRPSRouterContext>({})

RPSRouterContext.displayName = 'RPSRouterContext'
