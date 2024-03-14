/* eslint-disable react/prop-types */
import AddIcon from '@mui/icons-material/Add'
import { Autocomplete, Box, Button, Modal, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { useClient } from '../../context/ClientsContext'
import { useOrder } from '../../context/OrdersContext'
import { useProduct } from '../../context/ProductsContext'
import NewOrderTable from './NewOrderTable'

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
}

export default function CreateNewOrder({ open, onClose }) {
  const { clients } = useClient()
  const { products } = useProduct()
  const {
    createOrder,
    isLoading: isOrderLoading,
    currentOrder,
    updateOrder
  } = useOrder()
  const [selectedClient, setSelectedClient] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [quantity, setSelectedQuantity] = useState(0)
  const [allProducts, setAllProducts] = useState([])

  const handleAddProduct = async () => {
    if (!selectedClient || selectedProduct === null || quantity === 0) {
      alert('Please verify if all fields are selected')
      return
    }

    const existingProductIndex = allProducts.findIndex(
      (product) => product.id === selectedProduct.id
    )

    if (existingProductIndex !== -1) {
      const updatedProducts = [...allProducts]
      updatedProducts[existingProductIndex].quantity += Number(quantity)
      updatedProducts[existingProductIndex].totalPrice = (
        Number(updatedProducts[existingProductIndex].price) *
        updatedProducts[existingProductIndex].quantity
      ).toFixed(2)
      setAllProducts(updatedProducts)
    } else {
      setAllProducts((prev) => [
        ...prev,
        {
          ...selectedProduct,
          quantity: Number(quantity),
          totalPrice: (
            Number(selectedProduct.price) * Number(quantity)
          ).toFixed(2)
        }
      ])
    }
  }

  const resetFields = () => {
    setSelectedClient(null)
    setSelectedProduct(null)
    setSelectedQuantity(0)
    setAllProducts([])
  }

  const handleSaveOrder = async () => {
    if (allProducts.length === 0) {
      alert('Please select a product')
      return
    }

    const orderData = {
      client: selectedClient,
      orderDetails: {
        totalOrderPrice: allProducts.reduce(
          (total, product) => total + parseFloat(product.totalPrice),
          0
        ),
        totalItems: allProducts.reduce(
          (total, product) => total + parseFloat(product.quantity),
          0
        ),
        products: allProducts
      }
    }

    if (currentOrder) {
      await updateOrder(currentOrder.id, orderData)
    } else {
      await createOrder(orderData)
    }
    resetFields()
    onClose()
  }

  const removeProduct = (id) => {
    const updatedProducts = allProducts.filter((product) => product.id !== id)
    setAllProducts(updatedProducts)
  }

  const handleClose = () => {
    onClose()
    resetFields()
  }

  useEffect(() => {
    if (currentOrder) {
      setSelectedClient(currentOrder.client)
      setAllProducts(currentOrder.orderDetails.products)
    } else {
      // Se currentOrder for null, redefina os campos
      resetFields()
    }
  }, [currentOrder])

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <>
          <h2>
            {currentOrder
              ? `Edit Order #${currentOrder.id}`
              : 'Create new Order'}
          </h2>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={clients}
            getOptionLabel={(client) => client.fName + ' ' + client.lName}
            value={selectedClient}
            onChange={(event, newValue) => {
              setSelectedClient(newValue)
            }}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Choose a client" />
            )}
            style={{ marginBottom: '20px' }}
          />
          <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={products}
              getOptionLabel={(product) =>
                product.productName + ' ' + '$' + product.price
              }
              value={selectedProduct}
              onChange={(event, newValue) => {
                setSelectedProduct(newValue)
              }}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Choose a product" />
              )}
              style={{ marginBottom: '20px' }}
            />
            <TextField
              id="outlined-number"
              label="Quantity"
              type="number"
              InputLabelProps={{
                shrink: true
              }}
              value={quantity}
              onChange={(e) => setSelectedQuantity(e.target.value)}
            />
          </div>

          <Button
            variant="contained"
            onClick={handleAddProduct}
            startIcon={<AddIcon />}
            style={{ marginBottom: '20px' }}
          >
            Add Product
          </Button>

          <h3>Order:</h3>
          {allProducts.length > 0 && (
            <NewOrderTable products={allProducts} onDelete={removeProduct} />
          )}

          <Button
            variant="contained"
            onClick={handleSaveOrder}
            disabled={isOrderLoading}
            style={{ marginTop: '20px' }}
          >
            Save Order
          </Button>
        </>
      </Box>
    </Modal>
  )
}
