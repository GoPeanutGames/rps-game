import { useMemo } from 'react'
import { RPSPick } from './types'

export function useOppositePick({
  pick,
  isWin,
  isDraw,
}: {
  /**
   *  The player's pick to compute the opposite to.
   */
  pick?: RPSPick

  /**
   *  If `true` compute the opposite losing pick, win pick otherwise.
   */
  isWin?: boolean

  /**
   *  If `true` returns the same pick.
   */
  isDraw?: boolean
}) {
  return useMemo(() => {
    if (!pick || typeof isWin === 'undefined') return
    if (isDraw) return pick

    switch (pick) {
      case RPSPick.Rock:
        return isWin ? RPSPick.Scissors : RPSPick.Paper
      case RPSPick.Paper:
        return isWin ? RPSPick.Rock : RPSPick.Scissors
      case RPSPick.Scissors:
        return isWin ? RPSPick.Paper : RPSPick.Rock
      default:
        return
    }
  }, [pick, isWin, isDraw])
}
