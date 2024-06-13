import { createLazyFileRoute } from '@tanstack/react-router'
import { UserBalanceScreen } from '@feat/user/UserBalanceScreen'
import { useRPS } from '@feat/rps/useRPS'
import { ERC20Provider } from '@feat/erc20/ERC20Provider'

export const Route = createLazyFileRoute('/wallet')({
  component: Wallet,
})

function Wallet() {
  const { sourceAddress } = useRPS()

  return (
    <ERC20Provider address={sourceAddress}>
      <UserBalanceScreen />
    </ERC20Provider>
  )
}
