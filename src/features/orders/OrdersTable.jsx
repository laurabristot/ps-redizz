/* eslint-disable react/prop-types */
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { IconButton } from '@mui/material'
import Paper from '@mui/material/Paper'

import {
  Box,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useOrder } from '../../context/OrdersContext'

function Row(props) {
  const { row, onDelete, onEdit } = props
  const [open, setOpen] = useState(false)

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.client.fName + ' ' + row.client.lName}
        </TableCell>
        <TableCell align="right">{row.id}</TableCell>
        <TableCell align="right">{row.orderDetails.totalItems}</TableCell>
        <TableCell align="right">
          $ {row.orderDetails.totalOrderPrice.toFixed(2)}
        </TableCell>
        <TableCell align="right">
          <IconButton onClick={() => onDelete(row.id)} size="large">
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={() => onEdit(row.id)}>
            <EditIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Order Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Product Id</TableCell>
                    <TableCell>Item (s)</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Total item price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.orderDetails.products?.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell component="th" scope="row">
                        {product.id}
                      </TableCell>
                      <TableCell>{product.productName}</TableCell>
                      <TableCell align="right">{product.quantity}</TableCell>
                      <TableCell align="right">
                        $ {Number(product.totalPrice).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

export default function OrdersTable({ onDelete, onEdit }) {
  const [rows, setRows] = useState([])
  const { orders } = useOrder()

  useEffect(() => {
    if (orders && orders.length > 0) {
      setRows(orders)
    }
  }, [orders])

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Client Full Name</TableCell>
            <TableCell align="right">Order id</TableCell>
            <TableCell align="right">Total Items</TableCell>
            <TableCell align="right">Total Price</TableCell>
            <TableCell align="left">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.id} row={row} onDelete={onDelete} onEdit={onEdit} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
