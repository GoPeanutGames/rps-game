import { createContext } from 'react'

export interface IERC20Context {
  address?: Address
}

export const ERC20Context = createContext<IERC20Context>({})

ERC20Context.displayName = 'ERC20Context'
