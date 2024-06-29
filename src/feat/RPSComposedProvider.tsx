import { RPSFactoryProvider } from '@lib/rps/factory'
import { RPSRouterContext, RPSRouterProvider } from '@lib/rps/router'

const rpsRouterAddress = import.meta.env.VITE_RPS_ROUTER_ADDRESS
if (!rpsRouterAddress) {
  throw new Error('VITE_RPS_ROUTER_ADDRESS is not set')
}

export function RPSComposedProvider({ children }: { children?: Children }) {
  return (
    <RPSRouterProvider address={rpsRouterAddress}>
      <RPSRouterContext.Consumer>
        {({ factory }) => (
          <RPSFactoryProvider address={factory}>{children}</RPSFactoryProvider>
        )}
      </RPSRouterContext.Consumer>
    </RPSRouterProvider>
  )
}
