import { createContext } from 'react'

export interface RPSCtx {
  /**
   *  Address of the RPS contract.
   */
  address: Address

  /**
   *  Address of the related source token.
   */
  sourceAddress: Address
}

export const RPSContext = createContext<RPSCtx>({
  address: '0x',
  sourceAddress: '0x',
})

RPSContext.displayName = 'RPSContext'
