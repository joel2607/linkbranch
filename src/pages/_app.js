import { SessionProvider } from "next-auth/react"
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },

});


function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <ThemeProvider theme={darkTheme}>

      <CssBaseline/>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ThemeProvider>
  )
}

export default MyApp
