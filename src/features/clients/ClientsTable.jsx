/* eslint-disable react/prop-types */
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { IconButton } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useClient } from '../../context/ClientsContext'

export default function ClientsTable({ onDelete, onEdit }) {
  const { clients } = useClient()
  const handleEdit = (id) => {
    onEdit(id)
  }
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'fullName',
      headerName: 'Full Name',
      width: 130,
      valueGetter: (params) =>
        `${params.row.fName || ''} ${params.row.lName || ''}`
    },
    { field: 'phone', headerName: 'Phone', width: 130, type: 'number' },
    {
      field: 'cpf',
      headerName: 'cpf',
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
      <DataGrid rows={clients} columns={columns} />
    </div>
  )
}
