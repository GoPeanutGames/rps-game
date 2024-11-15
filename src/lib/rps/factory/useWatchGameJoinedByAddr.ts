import { useContext } from 'react'
import { useWatchContractEvent } from 'wagmi'
import { Log, hexToBigInt } from 'viem'
import { RPSFactoryContext } from './RPSFactoryContext'
import { abi } from './rps-factory.abi'
import { hexToAddress } from '@utils/address'

export function useWatchGameJoinedByAddr({
  gameAddress,
  onLogs,
}: {
  gameAddress?: Address
  onLogs?: (
    logs: {
      id: bigint
      game: Address
      player: Address
      log: Log<bigint, number, false, (typeof abi)[9], undefined>
    }[],
  ) => void
}) {
  const { address } = useContext(RPSFactoryContext)
  useWatchContractEvent({
    abi,
    address,
    eventName: 'GameJoined',
    args: { game: gameAddress },
    onLogs: logs =>
      onLogs?.(
        logs.map(log => ({
          id: hexToBigInt(log.topics[1]),
          game: hexToAddress(log.topics[2])!,
          player: hexToAddress(log.topics[3])!,
          log,
        })),
      ),
    enabled: !!address && !!gameAddress,
  })
}
