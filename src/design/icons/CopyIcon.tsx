import { Icon, IconProps } from '@chakra-ui/react'

export function CopyIcon(props: IconProps) {
  return (
    <Icon
      aria-hidden='true'
      viewBox='0 0 24 24'
      {...props}
    >
      <path
        d='M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2m0 16H8V7h11z'
        fill='currentColor'
      />
    </Icon>
  )
}