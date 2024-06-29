import { useReadContract } from 'wagmi'
import { IRPSFactoryContext, RPSFactoryContext } from './RPSFactoryContext'
import { abi } from './rps-factory.abi'

export interface RPSFactoryProviderProps
  extends Pick<IRPSFactoryContext, 'address'> {
  children?: Children
}

export function RPSFactoryProvider({
  address,
  children,
}: RPSFactoryProviderProps) {
  const { data: source } = useReadContract({
    address,
    abi,
    functionName: 'source',
    query: {
      enabled: !!address,
      staleTime: 3_000_000_000,
    },
  })

  return (
    <RPSFactoryContext.Provider
      value={{
        address,
        source,
      }}
    >
      {children}
    </RPSFactoryContext.Provider>
  )
}
