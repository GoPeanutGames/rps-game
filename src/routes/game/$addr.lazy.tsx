import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/game/$addr')({
  component: GamePage,
})

function GamePage() {
  const { addr } = Route.useParams()

  return <div>Game page: {addr}</div>
}
