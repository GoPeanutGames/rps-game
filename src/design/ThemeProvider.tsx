import {
  ChakraBaseProvider,
  extendTheme,
  type ThemeConfig,
} from '@chakra-ui/react'
import { cardTheme } from './CardTheme'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  components: {
    Card: cardTheme,
  },
  textStyles: {
    header: {
      fontSize: '33px',
      fontWeight: 800,
      lineHeight: '40px',
      letterSpacing: '1.65px',
    },
    label: {
      fontSize: '22px',
      fontWeight: '800',
      lineHeight: '40px',
      letterSpacing: '1.1px',
    },
    note: {
      fontSize: '18px',
      fontWeight: '400',
      lineHeight: '24px',
      letterSpacing: '0.9px',
    },
  },
})

export function ThemeProvider({ children }: { children?: Children }) {
  return <ChakraBaseProvider theme={theme}>{children}</ChakraBaseProvider>
}
