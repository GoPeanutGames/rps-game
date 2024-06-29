import { IRPSFreeContext, RPSFreeContext } from './RPSFreeContext'

export interface RPSFreeProviderProps extends Pick<IRPSFreeContext, 'address'> {
  children?: Children
}

export function RPSFreeProvider({ address, children }: RPSFreeProviderProps) {
  return (
    <RPSFreeContext.Provider value={{ address }}>
      {children}
    </RPSFreeContext.Provider>
  )
}
