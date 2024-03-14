/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer
} from 'react'
import {
  addOrder as createOrderAPI,
  editOrder,
  getAllOrders,
  getOrderById,
  removeOrder
} from '../services/apiOrders'

const OrderContext = createContext()

const initialState = {
  orders: [],
  isLoading: false,
  currentOrder: null,
  totalOrderPrice: 0,
  error: ''
}

function reducer(state, action) {
  switch (action.type) {
    case 'orders/loading':
      return { ...state, isLoading: true }
    case 'orders/getAll':
      return {
        ...state,
        orders: action.payload,
        isLoading: false,
        currentOrder: null
      }
    case 'orders/getById':
      return { ...state, currentOrder: action.payload, isLoading: false }
    case 'orders/create':
      return { ...state, isLoading: false }
    case 'orders/error':
      return { ...state, isLoading: false, error: action.payload }
    case 'orders/resetCurrent':
      return { ...state, currentOrder: null }
    default:
      return state
  }
}

function OrderProvider({ children }) {
  const [{ orders, isLoading, currentOrder, error }, dispatch] = useReducer(
    reducer,
    initialState
  )

  const fetchAllOrders = useCallback(async () => {
    try {
      const res = await getAllOrders()
      dispatch({ type: 'orders/getAll', payload: res })
    } catch (error) {
      dispatch({ type: 'orders/error', payload: error })
    }
  }, [])

  const deleteOrder = async (id) => {
    try {
      dispatch({ type: 'orders/loading' })
      await removeOrder(id)
      fetchAllOrders()
    } catch (error) {
      dispatch({ type: 'orders/error', payload: error })
    }
  }

  const createOrder = useCallback(
    async (orderData) => {
      try {
        dispatch({ type: 'orders/loading' })
        await createOrderAPI(orderData)
        dispatch({ type: 'orders/create' })
        fetchAllOrders()
      } catch (error) {
        dispatch({ type: 'orders/error', payload: error })
      }
    },
    [fetchAllOrders]
  )

  const fetchOrderById = async (orderId) => {
    try {
      dispatch({ type: 'orders/loading' })
      const res = await getOrderById(orderId)
      dispatch({ type: 'orders/getById', payload: res })
    } catch (error) {
      dispatch({ type: 'orders/error', payload: error })
    }
  }

  const updateOrder = async (orderId, orderData) => {
    try {
      dispatch({ type: 'orders/loading' })
      await editOrder(orderId, orderData)
      dispatch({ type: 'orders/create' })
      fetchAllOrders()
    } catch (error) {
      dispatch({ type: 'orders/error', payload: error })
    }
  }

  const resetCurrentOrder = () => {
    dispatch({ type: 'orders/resetCurrent' })
  }

  useEffect(() => {
    fetchAllOrders()
  }, [fetchAllOrders])

  return (
    <OrderContext.Provider
      value={{
        orders,
        isLoading,
        currentOrder,
        error,
        fetchAllOrders,
        createOrder,
        deleteOrder,
        updateOrder,
        fetchOrderById,
        resetCurrentOrder
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

function useOrder() {
  const context = useContext(OrderContext)
  if (context === undefined)
    throw new Error('OrderContext was used outside of OrderProvider')

  return context
}

export { OrderProvider, useOrder }
