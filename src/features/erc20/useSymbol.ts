import { useContext } from 'react'
import { useReadContract } from 'wagmi'
import { ERC20Context } from './ERC20Context'
import { abi } from './erc20.abi.ts'

export function useSymbol() {
  const { address } = useContext(ERC20Context)
  return useReadContract({
    abi,
    address,
    functionName: 'symbol',
    query: {
      enabled: !!address,
      staleTime: 14_000_000_000,
    },
  })
}
