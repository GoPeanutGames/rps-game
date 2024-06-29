import {
  ChakraBaseProvider,
  extendTheme,
  type ThemeConfig,
} from '@chakra-ui/react'
import { cardTheme } from './theme/CardTheme'
import { linkTheme } from './theme/LinkTheme'
import { textTheme } from './theme/TextTheme'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  components: {
    Card: cardTheme,
    Link: linkTheme,
    Text: textTheme,
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
  colors: {
    funky: {
      100: '#F5FBE6',
      200: '#EAF7CE',
      300: '#D6EF9C',
      400: '#C2E76B',
      500: '#ADDF39',
      600: '#82A72B',
      700: '#566F1C',
      800: '#2B380E',
      900: '#161C07',
    },
  },
})

export function ThemeProvider({ children }: { children?: Children }) {
  return <ChakraBaseProvider theme={theme}>{children}</ChakraBaseProvider>
}
