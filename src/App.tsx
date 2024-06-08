import logo from '/icon.webp'
import { ConnectBtn } from '@feat/wallet/ConnectBtn'

export function App() {
  return (
    <div>
      <h1 style={{ margin: 0 }}>
        <img
          src={logo}
          style={{ marginRight: '12px' }}
        />
        PeanutGames - Rock Paper Scissors
      </h1>

      <ConnectBtn>Connect Wallet</ConnectBtn>
    </div>
  )
}
