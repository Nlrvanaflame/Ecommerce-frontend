import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const queryClient = new QueryClient()

const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: 'gray.800',
        color: 'gray.100'
      }
    }
  }
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
)

export default queryClient
