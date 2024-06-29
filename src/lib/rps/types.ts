/**
 *  Pick is a option that player picks during the game play.
 */
export enum RPSPick {
  None = 0,
  Rock = 1,
  Paper = 2,
  Scissors = 3,
}

/**
 *  An overview game instance.
 */
export interface Game {
  id: bigint
  addr: Address
  stakes: bigint
  numPlayers: bigint
}
