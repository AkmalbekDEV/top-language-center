import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ProductProvider from './context/ProductContext.jsx'
import GroupProvider from './context/GroupContext.jsx'
import i18next from 'i18next'
import { I18nextProvider } from 'react-i18next'
import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <I18nextProvider i18n={i18next}>
      <ProductProvider>
      <GroupProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </GroupProvider>
      </ProductProvider>
    </I18nextProvider>
  </BrowserRouter>
)
