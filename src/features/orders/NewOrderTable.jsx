/* eslint-disable react/prop-types */
import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

export default function NewOrderTable({ products, onDelete }) {
  const columns = [
    {
      field: 'id',
      headerName: 'Product Id',
      width: 80
    },
    {
      field: 'productName',
      headerName: 'Product',
      width: 150
    },
    { field: 'price', headerName: 'Price', width: 130, type: 'number' },
    {
      field: 'quantity',
      headerName: 'Quantity',
      type: 'number',
      width: 80
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
