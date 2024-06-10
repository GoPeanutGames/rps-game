import { useContext } from 'react'
import { RPSContext } from './RPSContext'

export function useRPS() {
  return useContext(RPSContext)
}
