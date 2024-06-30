import { useContext } from 'react'
import { useWatchContractEvent } from 'wagmi'
import { Log, hexToBigInt } from 'viem'
import { RPSFactoryContext } from './RPSFactoryContext'
import { abi } from './rps-factory.abi'
import { hexToAddress } from '@utils/address'

export function useWatchGameOverByAddr({
  gameAddress,
  onLogs,
}: {
  gameAddress?: Address
  onLogs?: (
    logs: {
      id: bigint
      game: Address
      log: Log<bigint, number, false, (typeof abi)[11], undefined>
    }[],
  ) => void
}) {
  const { address } = useContext(RPSFactoryContext)
  useWatchContractEvent({
    abi,
    address,
    eventName: 'GameOver',
    args: { game: gameAddress },
    onLogs: logs =>
      onLogs?.(
        logs.map(log => ({
          id: hexToBigInt(log.topics[1]),
          game: hexToAddress(log.topics[2]) as Address,
          log,
        })),
      ),
    enabled: !!address && !!gameAddress,
  })
}
