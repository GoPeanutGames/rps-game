import {
  ChakraBaseProvider,
  extendTheme,
  type ThemeConfig,
} from '@chakra-ui/react'

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
})

export function ThemeProvider({ children }: { children?: Children }) {
  return <ChakraBaseProvider theme={theme}>{children}</ChakraBaseProvider>
}
