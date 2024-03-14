import AddIcon from '@mui/icons-material/Add'
import { Button } from '@mui/material'
import { useState } from 'react'
import { useProduct } from '../../context/ProductsContext'
import CreateNewProduct from './CreateNewProduct'
import ProductsTable from './ProductsTable'

export default function Products() {
  const {
    products: allProducts,
    deleteProduct,
    isLoading: isProductsLoading,
    resetCurrentProduct,
    fetchProductById
  } = useProduct()
  const [openModal, setOpenModal] = useState(false)

  const handleCloseModal = () => {
    resetCurrentProduct()
    setOpenModal(false)
  }
  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleDelete = async (id) => {
    const confirmed = confirm('Are you sure you want to delete this product?')
    if (!confirmed) {
      return
    }
    await deleteProduct(id)
  }

  const handleEditProducts = async (id) => {
    fetchProductById(id)
    handleOpenModal()
  }

  return (
    <div>
      <h1>Products</h1>
      <Button
        variant="contained"
        onClick={handleOpenModal}
        startIcon={<AddIcon />}
        style={{ marginBottom: '20px' }}
      >
        New Product
      </Button>

      {allProducts.length < 1 ? (
        <p>Start creating a new product</p>
      ) : isProductsLoading ? (
        <p>Loading...</p>
      ) : (
        <ProductsTable onDelete={handleDelete} onEdit={handleEditProducts} />
      )}

      <CreateNewProduct open={openModal} onClose={handleCloseModal} />
    </div>
  )
}
