import AddIcon from '@mui/icons-material/Add'
import { Button } from '@mui/material'
import { useState } from 'react'
import { useOrder } from '../../context/OrdersContext'
import CreateNewOrder from './CreateNewOrder'
import OrdersTable from './OrdersTable'

export default function Orders() {
  const [openModal, setOpenModal] = useState(false)
  const { deleteOrder, isLoading, orders, fetchOrderById, resetCurrentOrder } =
    useOrder()

  const handleOpenModal = () => {
    setOpenModal(true)
  }
  const handleCloseModal = () => {
    setOpenModal(false)
    resetCurrentOrder()
  }

  const handleDelete = async (id) => {
    const confirmed = confirm(`Are you sure you want to delete this order?`)
    if (!confirmed) {
      return
    }
    await deleteOrder(id)
    handleCloseModal()
  }
  const handleEdit = async (id) => {
    handleOpenModal()
    await fetchOrderById(id)
  }

  return (
    <div>
      <h1>Orders</h1>
      <Button
        variant="contained"
        onClick={handleOpenModal}
        startIcon={<AddIcon />}
        style={{ marginBottom: '20px' }}
      >
        New Order
      </Button>

      {orders.length > 0 ? (
        isLoading ? (
          <p>Loading...</p>
        ) : (
          <OrdersTable onDelete={handleDelete} onEdit={handleEdit} />
        )
      ) : (
        <p>Create a order</p>
      )}

      <CreateNewOrder open={openModal} onClose={handleCloseModal} />
    </div>
  )
}
