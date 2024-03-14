import Clients from '../../features/clients/Clients'
import Orders from '../../features/orders/Orders'
import Products from '../../features/products/Products'

export default function Home() {
  return (
    <div>
      <Clients />
      <Products />
      <Orders />
    </div>
  )
}
