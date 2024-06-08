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
})

export function ThemeProvider({ children }: { children?: Children }) {
  return <ChakraBaseProvider theme={theme}>{children}</ChakraBaseProvider>
}
