import { useContext } from 'react'
import { useWatchContractEvent } from 'wagmi'
import { Log, getAddress, hexToBigInt } from 'viem'
import { RPSFactoryContext } from './RPSFactoryContext'
import { abi } from './rps-factory.abi'

export function useWatchGameLeftByAddr({
  gameAddress,
  onLogs,
}: {
  gameAddress?: Address
  onLogs?: (
    logs: {
      id: bigint
      game: Address
      player: Address
      log: Log<bigint, number, false, (typeof abi)[10], undefined>
    }[],
  ) => void
}) {
  const { address } = useContext(RPSFactoryContext)
  useWatchContractEvent({
    abi,
    address,
    eventName: 'GameLeft',
    args: { game: gameAddress },
    onLogs: logs =>
      onLogs?.(
        logs.map(log => ({
          id: hexToBigInt(log.topics[1]),
          game: getAddress(`0x${log.topics[2].slice(26)}`),
          player: getAddress(`0x${log.topics[3].slice(26)}`),
          log,
        })),
      ),
    enabled: !!address && !!gameAddress,
  })
}
