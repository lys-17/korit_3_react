import { AppBar, Toolbar, Typography, Container, CssBaseline } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Login from './components/Login';

function App() {
  const queryClient = new QueryClient();

  return (
    <Container maxWidth="xl">
      <CssBaseline/>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6'>
            Car shop | 자동차 거래소
          </Typography>
        </Toolbar>
      </AppBar>
      <QueryClientProvider client={queryClient}>
        <Login/>
      </QueryClientProvider>
    </Container>
  )
}

export default App
