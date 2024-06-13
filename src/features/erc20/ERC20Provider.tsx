import { IERC20Context, ERC20Context } from './ERC20Context'

export interface ERC20ProviderProps extends Pick<IERC20Context, 'address'> {
  children?: Children
}

export function ERC20Provider({ address, children }: ERC20ProviderProps) {
  return (
    <ERC20Context.Provider
      value={{
        address,
      }}
    >
      {children}
    </ERC20Context.Provider>
  )
}
