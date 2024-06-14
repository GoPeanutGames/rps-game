import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const variants = {
  funky: defineStyle({
    color: 'funky.300',
    fontFamily: 'monospace',
    transition: '.32s ease',
    _hover: {
      textDecoration: 'none',
      color: 'funky.500',
    },
  }),
}

export const linkTheme = defineStyleConfig({ variants })
