import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const variants = {
  help: defineStyle({
    fontStyle: 'italic',
    color: 'gray.600',
    borderLeftWidth: '3px',
    borderStyle: 'solid',
    borderColor: 'gray.600',
    pl: 3,
  }),
}

export const textTheme = defineStyleConfig({ variants })
