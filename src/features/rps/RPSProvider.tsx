import { IRPSContext, RPSContext } from './RPSContext'

export interface RPSProviderProps extends Pick<IRPSContext, 'address'> {
  children?: Children
}

export function RPSProvider({ address, children }: RPSProviderProps) {
  return (
    <RPSContext.Provider
      value={{
        address,
      }}
    >
      {children}
    </RPSContext.Provider>
  )
}
