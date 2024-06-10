import { cardAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys)

const variants = {
  funky: definePartsStyle({
    container: {
      background: '#B0A8DB',
      border: '3px solid #FFFFFF',
      borderRadius: '29px',
      p: '30px 24px',
      color: '#000000',
    },
    header: {
      textAlign: 'center',
      fontFamily: 'Chivo',
      fontSize: '20px',
      fontWeight: 600,
      lineHeight: '15px',
      letterSpacing: '-.2px',
    },
    footer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '24px',
    },
  }),
}

export const cardTheme = defineMultiStyleConfig({ variants })
