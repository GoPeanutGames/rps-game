import { useReadContract } from 'wagmi'
import { IRPSRouterContext, RPSRouterContext } from './RPSRouterContext'
import { abi } from './rps-router.abi'

export interface RPSRouterProviderProps
  extends Pick<IRPSRouterContext, 'address'> {
  children?: Children
}

export function RPSRouterProvider({
  address,
  children,
}: RPSRouterProviderProps) {
  const { data: factory } = useReadContract({
    address,
    abi,
    functionName: 'factory',
    query: {
      enabled: !!address,
      staleTime: 3_000_000_000,
    },
  })

  return (
    <RPSRouterContext.Provider
      value={{
        address,
        factory,
      }}
    >
      {children}
    </RPSRouterContext.Provider>
  )
}
