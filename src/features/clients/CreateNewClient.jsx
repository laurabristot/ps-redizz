/* eslint-disable react/prop-types */
import { Box, Button, Modal, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { useClient } from '../../context/ClientsContext'

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

export default function CreateNewClient({ open, onClose }) {
  const { currentClient, isLoading, updateClient, createClient } = useClient()
  const [fName, setFName] = useState('')
  const [lName, setLName] = useState('')
  const [phone, setPhone] = useState('')
  const [cpf, setCpf] = useState('')

  const handleSubmitNewClient = async () => {
    if (fName === '' || lName === '' || phone === '' || cpf === '') {
      alert('Please fill all the fields')
      return
    }

    const client = {
      fName: fName,
      lName: lName,
      phone: phone,
      cpf: cpf
    }

    if (currentClient) {
      await updateClient(currentClient.id, client)
    } else {
      await createClient(client)
    }
    onClose()
  }

  const resetFields = async () => {
    onClose()
    setCpf('')
    setFName('')
    setLName('')
    setPhone('')
  }

  useEffect(() => {
    if (currentClient) {
      setCpf(currentClient.cpf)
      setFName(currentClient.fName)
      setLName(currentClient.lName)
      setPhone(currentClient.phone)
    } else {
      resetFields()
    }
  }, [currentClient])

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
              {currentClient ? 'Edit Client' : 'New Client'}
            </h2>
            <TextField
              id="standard-basic"
              label="Name"
              variant="standard"
              fullWidth
              value={fName}
              onChange={(e) => setFName(e.target.value)}
            />
            <TextField
              id="standard-basic"
              label="Last Name"
              variant="standard"
              fullWidth
              value={lName}
              onChange={(e) => setLName(e.target.value)}
            />
            <TextField
              id="standard-basic"
              label="Phone"
              variant="standard"
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <TextField
              id="standard-basic"
              label="CPF"
              variant="standard"
              fullWidth
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={handleSubmitNewClient}
              disabled={isLoading}
              style={{ marginTop: '10px' }}
            >
              {currentClient ? 'Save Changes' : 'Create new Client'}
            </Button>
          </>
        )}
      </Box>
    </Modal>
  )
}
