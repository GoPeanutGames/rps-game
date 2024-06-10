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
  styles: {
    global: {
      body: {
        w: '100vw',
        h: '100vh',
        backgroundImage: 'url("/bg.webp")',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        fontFamily: '"Sora", serif',
      },
    },
  },
  components: {
    Card: cardTheme,
  },
})

export function ThemeProvider({ children }: { children?: Children }) {
  return <ChakraBaseProvider theme={theme}>{children}</ChakraBaseProvider>
}
