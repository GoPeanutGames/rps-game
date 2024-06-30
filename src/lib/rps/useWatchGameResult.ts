import { useContext } from 'react'
import { Log, hexToNumber } from 'viem'
import { RPSContext } from './RPSContext'
import { useWatchContractEvent } from 'wagmi'
import { abi } from './rps.abi'
import { hexToAddress } from '@utils/address'

export function useWatchGameResult({
  onLogs,
}: {
  onLogs?: (
    logs: {
      pick0: number
      pick1: number
      winner: Address
      log: Log<bigint, number, false, (typeof abi)[14], undefined>
    }[],
  ) => void
}) {
  const { address } = useContext(RPSContext)
  useWatchContractEvent({
    abi,
    address,
    eventName: 'GameResult',
    onLogs: logs =>
      onLogs?.(
        logs.map(log => ({
          pick0: hexToNumber(log.topics[1]),
          pick1: hexToNumber(log.topics[2]),
          winner: hexToAddress(log.topics[3]) as Address,
          log,
        })),
      ),
  })
}
