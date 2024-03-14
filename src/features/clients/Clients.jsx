import AddIcon from '@mui/icons-material/Add'
import { Button } from '@mui/material'
import { useState } from 'react'
import { useClient } from '../../context/ClientsContext'
import ClientsTable from './ClientsTable'
import CreateNewClient from './CreateNewClient'

export default function Clients() {
  const {
    clients: allClients,
    deleteClient,
    isLoading: isClientsLoading,
    resetCurrentClient,
    fetchClientById
  } = useClient()
  const [openModal, setOpenModal] = useState(false)

  const handleCloseModal = () => {
    resetCurrentClient()
    setOpenModal(false)
  }
  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleDelete = async (id) => {
    const confirmed = confirm('Are you sure you want to delete this client?')
    if (!confirmed) {
      return
    }
    await deleteClient(id)
  }

  const handleEditClients = async (id) => {
    fetchClientById(id)
    handleOpenModal()
  }

  return (
    <div>
      <h1>Clients</h1>
      <Button
        variant="contained"
        onClick={handleOpenModal}
        startIcon={<AddIcon />}
        style={{ marginBottom: '20px' }}
      >
        New Client
      </Button>

      {allClients.length < 1 ? (
        <p>Start Creating a new Client</p>
      ) : isClientsLoading ? (
        <p>Loading...</p>
      ) : (
        <ClientsTable onDelete={handleDelete} onEdit={handleEditClients} />
      )}

      <CreateNewClient open={openModal} onClose={handleCloseModal} />
    </div>
  )
}
