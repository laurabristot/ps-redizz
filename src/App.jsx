import { CssBaseline } from '@mui/material'
import './App.css'
import { ClientProvider } from './context/ClientsContext'
import { OrderProvider } from './context/OrdersContext'
import { ProductProvider } from './context/ProductsContext'
import Home from './pages/Home/Home'

function App() {
  return (
    <>
      <ClientProvider>
        <ProductProvider>
          <OrderProvider>
            <div>
              <CssBaseline />
              <Home />
            </div>
          </OrderProvider>
        </ProductProvider>
      </ClientProvider>
    </>
  )
}

export default App
