import { HTMLChakraProps, chakra } from '@chakra-ui/react'
import { CSSProperties, useMemo } from 'react'

export function Avatar({
  address,
  ...props
}: HTMLChakraProps<'div'> & {
  address: Address
}) {
  const colors = useMemo(() => {
    const seedArr = address.match(/.{1,7}/g)?.splice(0, 5)
    const colors: string[] = []

    seedArr?.forEach(seed => {
      let hash = 0
      for (let i = 0; i < seed.length; i += 1) {
        hash = seed.charCodeAt(i) + ((hash << 5) - hash)
        hash = hash & hash
      }

      const rgb = [0, 0, 0]
      for (let i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 255
        rgb[i] = value
      }
      colors.push(`rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`)
    })

    return colors
  }, [address])

  return (
    <chakra.div
      w='8'
      h='8'
      borderRadius='50%'
      bgColor='var(--color-av-1)'
      backgroundImage={`radial-gradient(
at 66% 77%,
var(--color-av-2) 0px,
transparent 50%
),
radial-gradient(at 29% 97%, var(--color-av-3) 0px, transparent 50%),
radial-gradient(at 99% 86%, var(--color-av-4) 0px, transparent 50%),
radial-gradient(at 29% 88%, var(--color-av-5) 0px, transparent 50%)`}
      {...props}
      style={
        {
          '--color-av-1': colors[0],
          '--color-av-2': colors[1],
          '--color-av-3': colors[2],
          '--color-av-4': colors[3],
          '--color-av-5': colors[4],
        } as CSSProperties
      }
    />
  )
}
