import { useContext } from 'react'
import { RPSFactoryContext } from './RPSFactoryContext'
import { useWatchContractEvent } from 'wagmi'
import { abi } from './rps-factory.abi'
import { Log } from 'viem'

type GameJoninedLog = Log<bigint, number, false, (typeof abi)[9], undefined>[]

export function useWatchGameJoinedByAddr({
  gameAddress,
  onEvent,
}: {
  gameAddress?: Address
  onEvent?: (logs: GameJoninedLog) => void
}) {
  const { address } = useContext(RPSFactoryContext)
  useWatchContractEvent({
    abi,
    address,
    eventName: 'GameJoined',
    args: { game: gameAddress },
    onLogs: logs => onEvent?.(logs),
    enabled: !!address && !!gameAddress,
  })
}
