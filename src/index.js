import React from 'react'
import { createRoot, render } from 'react-dom';
import App from './App'
import { ChakraProvider, theme } from '@chakra-ui/react'

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
)