/* eslint-disable react/prop-types */
import { Box, Button, Modal, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { useProduct } from '../../context/ProductsContext'

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
}

export default function CreateNewProduct({ open, onClose }) {
  const { isLoading, currentProduct, updateProduct, createProduct } =
    useProduct()
  const [productName, setProductName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')

  const handleSubmitNewProduct = async () => {
    if (productName === '' || description === '' || price === '') {
      alert('Please fill all the fields')
      return
    }

    const product = {
      productName: productName,
      description: description,
      price: Number(price).toFixed(2)
    }

    if (currentProduct) {
      await updateProduct(currentProduct.id, product)
    } else {
      await createProduct(product)
    }
    onClose()
  }

  const resetFields = async () => {
    onClose()
    setProductName('')
    setDescription('')
    setPrice('')
  }

  useEffect(() => {
    if (currentProduct) {
      setProductName(currentProduct.productName)
      setDescription(currentProduct.description)
      setPrice(currentProduct.price)
    } else {
      resetFields()
    }
  }, [currentProduct])

  return (
    <Modal
      open={open}
      onClose={resetFields}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={modalStyle}>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h2 id="parent-modal-title">
              {currentProduct ? 'Edit Product' : 'New product'}
            </h2>
            <TextField
              id="standard-basic"
              label="Product Name"
              variant="standard"
              fullWidth
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <TextField
              id="standard-basic"
              label="Description"
              variant="standard"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              id="standard-basic"
              label="Price"
              variant="standard"
              fullWidth
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={handleSubmitNewProduct}
              disabled={isLoading}
              style={{ marginTop: '10px' }}
            >
              {currentProduct ? 'Save Changes' : 'Create new Product'}
            </Button>
          </>
        )}
      </Box>
    </Modal>
  )
}
