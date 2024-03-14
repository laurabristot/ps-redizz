/* eslint-disable react/prop-types */
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { IconButton } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useProduct } from '../../context/ProductsContext'

export default function ProductsTable({ onDelete, onEdit }) {
  const { products } = useProduct()
  const handleEdit = (id) => {
    onEdit(id)
  }
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'productName',
      headerName: 'Product',
      width: 130
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 130,
      type: 'number',
      valueGetter: (params) => `$ ${params.row.price || ''}`
    },
    {
      field: 'description',
      headerName: 'Description',
      type: 'number',
      width: 150
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 130,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => onDelete(params.row.id)} size="large">
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={() => handleEdit(params.row.id)}>
            <EditIcon />
          </IconButton>
        </>
      )
    }
  ]

  return (
    <div>
      <DataGrid rows={products} columns={columns} />
    </div>
  )
}
