import { useReadContract } from 'wagmi'
import { RPSContext } from './RPSContext'
import { abi } from './rpsFreeAbi'

const address = import.meta.env.VITE_RPS_ADDRESS
if (!address) {
  throw new Error('VITE_RPS_ADDRESS is not set')
}

export function RPSProvider({ children }: { children: Children }) {
  const { data: sourceAddress } = useReadContract({
    abi,
    address,
    functionName: 'source',
    query: {
      staleTime: 3_000_000_000,
      enabled: !!address,
    },
  })

  return (
    <RPSContext.Provider
      value={{
        address: address!,
        sourceAddress: sourceAddress!,
      }}
    >
      {children}
    </RPSContext.Provider>
  )
}
